import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calls, PeerService } from '@/services';

const useWebRTC = ({ video = true, audio = true }) => {
  const socket = useSelector(state => state.socket.socket);
  const callInfo = useSelector(state => state.call);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [PS, setPS] = useState(null);

  // useEffect(() => {
  //   if (callInfo) {
  //     const peerService = new PeerService(callInfo.receiverId);
  //     peerService.setOnRemoteStream(setRemoteStream);
  //     setPS(peerService);
  //     console.log('PeerService instantiated');
  //   }
  // }, [callInfo]);

  useEffect(() => {
    if (!callInfo.receiverId) return;

    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
        setLocalStream(stream);
        if (PS) {
          PS.addLocalStream(stream);
          console.log('Local stream added to PeerService');
        }
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMedia();
  }, [video, audio, callInfo, PS]);

  const callUser = async () => {
    if (!socket || !PS) return;
    const offer = await PS.getOffer();
    await Calls.makeCallRequest({
      callerId: callInfo.callerId,
      receiverId: callInfo.receiverId,
      created_Offer: offer,
    });
    console.log('Call request made with offer:', offer);
  };

  useEffect(() => {
    if (PS && socket) {
      callUser();
    }
  }, [PS, socket]);

  useEffect(() => {
    if (!socket) return;

    const handleMakeCallNotification = async (message) => {
      const incomingOffer = message.payload;
      if (!incomingOffer) return;

      console.log('Incoming call offer:', incomingOffer);
      const answer = await PS.getAnswer(incomingOffer);
      if (!answer) return;

      await Calls.ansToCall({
        receiverId: callInfo.receiverId,
        ans: answer,
      });
      console.log('Answer sent:', answer);
    };

    const handleAnswerToCall = async (message) => {
      try {
        const incomingAnswer = message.payload;
        if (incomingAnswer === false) {
          alert('Call Rejected!');
          return;
        }
        await PS.setRemoteDescription(incomingAnswer);
        alert('Call accepted!');
        console.log('Remote description set with answer:', incomingAnswer);
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    };

    socket.on('make-call-notification', handleMakeCallNotification);
    socket.on('ans-to-call', handleAnswerToCall);

    return () => {
      socket.off('make-call-notification', handleMakeCallNotification);
      socket.off('ans-to-call', handleAnswerToCall);
    };
  }, [callInfo, socket, PS]);

  return { localStream, remoteStream };
};

export default useWebRTC;
