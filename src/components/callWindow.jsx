import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calls } from '@/services';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Mic, MicOff } from 'lucide-react';

const CallWindow = ({ video = true, audio = true }) => {
    const socket = useSelector(state => state.socket.socket);
    const callInfo = useSelector(state => state.call);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peer, setPeer] = useState(null);
    const [volume, setVolume] = useState(1);
    const [isRemoteMute, setIsRemoteMute] = useState(false);

    useEffect(() => {
        if (peer || !callInfo.receiverId) return;

        const newPeer = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun3.l.google.com:19302' },
                { urls: 'stun:stun4.l.google.com:19302' }
            ],
        });

         newPeer.onicecandidate = async (event) => {
            if (event.candidate) {
                console.log('ICE Candidate:', event.candidate);
                await Calls.initializeCall(event.candidate, callInfo.receiverId);
            } else {
                console.log('All ICE candidates have been sent');
            }
        };

        newPeer.onicecandidateerror = (event) => {
            console.error('ICE Candidate Error:', event);
        };

        newPeer.ontrack = event => {
            console.log('Remote track added:', event.streams[0]);
            setRemoteStream(event.streams[0]);
        };

        newPeer.oniceconnectionstatechange = () => {
            console.log('ICE Connection State Change:', newPeer.iceConnectionState);
        };

        newPeer.onconnectionstatechange = () => {
            console.log('Connection State Change:', newPeer.connectionState);
        };

        setPeer(newPeer);
    }, [callInfo]);

    useEffect(() => {
        if (!peer || !callInfo.receiverId) return;

        const getMedia = async () => { 
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
                setLocalStream(stream);
                stream.getTracks().forEach(track => peer.addTrack(track, stream));
                console.log('Local stream added to PeerConnection');
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        getMedia();
    }, [video, audio, callInfo, peer]);

    const callUser = async () => {
        if (!socket || !peer) return;
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        console.log('Offer created:', offer);
        await Calls.makeCallRequest({
            callerId: callInfo.callerId,
            receiverId: callInfo.receiverId,
            created_Offer: offer,
        });
        console.log('Call request made with offer:', offer);
    };

    useEffect(() => {
        if (peer && socket) {
            callUser();
        }
    }, [peer, socket]);

    useEffect(() => {
        if (!socket) return;

        const handleMakeCallNotification = async (message) => {
            const incomingOffer = message.payload;
            if (!incomingOffer) return;

            console.log('Incoming call offer:', incomingOffer);
            await peer.setRemoteDescription(new RTCSessionDescription(incomingOffer));
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);
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
                await peer.setRemoteDescription(new RTCSessionDescription(incomingAnswer));
                alert('Call accepted!');
                console.log('Remote description set with answer:', incomingAnswer);
            } catch (error) {
                console.error('Error handling answer:', error);
            }
        };

        const handleNewICECandidate = async (message) => {
            try {
                const candidate = new RTCIceCandidate(message.payload);
                await peer.addIceCandidate(candidate);
                console.log('Remote ICE candidate added:', candidate);
            } catch (error) {
                console.error('Error adding remote ICE candidate', error);
            }
        };

        socket.on('make-call-notification', handleMakeCallNotification);
        socket.on('ans-to-call', handleAnswerToCall);
        socket.on('new-ice-candidate', handleNewICECandidate);

        return () => {
            socket.off('make-call-notification', handleMakeCallNotification);
            socket.off('ans-to-call', handleAnswerToCall);
            socket.off('new-ice-candidate', handleNewICECandidate);
        };
    }, [callInfo, socket, peer]);

    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    useEffect(() => {
        if (remoteStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    useEffect(() => {
        if (localVideoRef.current) {
            localVideoRef.current.volume = volume;
        }
        setIsRemoteMute(volume === '0');
    }, [volume]);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const toggleMute = () => {
        setVolume(volume === '0' ? 0.2 : 0);
    };

    return (
        <div className='mx-auto overflow-y-scroll h-screen no-scrollbar'>
            <div>
                <ResizablePanelGroup direction="horizontal" className={"mx-auto"}>
                    <ResizablePanel>
                        <div className=''>
                            <h4 className="text-center border-b pb-2 scroll-m-20 text-xl font-semibold tracking-tight">
                                {"You"}
                            </h4>
                            <video className='rounded-3xl p-4' ref={localVideoRef} autoPlay muted style={{ width: '100%' }} />
                            <div className='flex justify-between mx-5 cursor-pointer'>
                                <input
                                    id="volumeControl"
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                     onChange={handleVolumeChange}
                                />
                                {isRemoteMute ?
                                    <MicOff className='text-red-600' onClick={toggleMute} /> :
                                    <Mic className='text-green-600' onClick={toggleMute} />}
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel>
                        <div className='text-center'>
                            <h4 className="border-b pb-2 scroll-m-20 text-xl font-semibold tracking-tight">
                                {"@nick"}
                            </h4> 
                            {video ?
                                <video ref={remoteVideoRef} autoPlay style={{ width: '100%' }} /> :
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    Waiting to Accept call request
                                </h2>
                            }
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    );
};

export default CallWindow;
