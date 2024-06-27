import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calls, PeerService } from '@/services';

const useWebRTC = ({ video = true, audio = true }) => {
  const socket = useSelector(state => state.socket.socket);
  const callInfo = useSelector(state => state.call);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [PS, setPS] = useState(null)
  useEffect(()=>{
    if(callInfo){
      setPS(new PeerService(callInfo.receiverId))
    }
  },[callInfo])
  
  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
        setLocalStream(stream);
        PS.addLocalStream(stream);
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMedia();
  }, [video, audio]);

  const callUser = async () => {
    if (!socket) return;
    const offer = await PS.getOffer();
    await Calls.makeCallRequest({
      callerId: callInfo.callerId,
      receiverId: callInfo.receiverId,
      created_Offer: offer,
    });
  };
useEffect(()=>{
    callUser()
})
  useEffect(() => {
    if (!socket) return;

    socket.on('make-call-notification', async (message) => {
      const incomingOffer = message.payload;
      if (!incomingOffer) return;

      const answer = await PS.getAnswer(incomingOffer);
      if (!answer) return;

      await Calls.ansToCall({
        receiverId: callInfo.receiverId,
        ans: answer,
      });
    });

    socket.on('ans-to-call', async (message) => {
      try {
        const incomingAnswer = message.payload;
        if (incomingAnswer === false) {
          alert('Call Rejected!');
          return;
        }
        await PS.setRemoteDescription(incomingAnswer);
        alert('Call accepted!');
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    });

    return () => {
      socket.off('make-call-notification');
      socket.off('ans-to-call');
    };
  }, [callInfo, socket]);

  // useEffect(() => {
  //   PS.onRemoteStream = setRemoteStream;
  // }, []);

  return { localStream, remoteStream };
};

export default useWebRTC;
