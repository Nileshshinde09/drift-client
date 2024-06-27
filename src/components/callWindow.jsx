import { useWebRTC } from '@/hooks';
import React, { useRef, useEffect, useState } from 'react';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Mic, MicOff } from 'lucide-react';

const CallWindow = ({ video = true, audio = true }) => {
    const { localStream, remoteStream } = useWebRTC({ video, audio });
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [isRemoteMute, setIsRemoteMute] = useState(false)
    const testPeerConnection = async () => {
        const peer = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' }
          ],
        });
      
        peer.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('Test ICE Candidate:', event.candidate);
          } else {
            console.log('Test: All ICE candidates have been sent');
          }
        };
      
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        stream.getTracks().forEach(track => peer.addTrack(track, stream));
      
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        console.log('Test: Offer created and set:', offer);
      };
      
      testPeerConnection();
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
        if (volume === '0') {
            setIsRemoteMute(true)
        } else {
            setIsRemoteMute(false)
        }
    }, [volume]);

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };
    const setUnMute = () => {
        if (volume === '0') {
            setVolume('0.2')
            localVideoRef.current.volume = '0.2'
            setIsRemoteMute(false)
        } else {
            setVolume('0')
            localVideoRef.current.volume = '0'
            setIsRemoteMute(true)
        }
    }
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
                                {isRemoteMute ? <MicOff className='text-red-600' onClick={() => setUnMute()} /> : <Mic className='text-green-600' onClick={() => setUnMute()} />}
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel>
                        <div className='text-center'>
                            <h4 className="border-b pb-2 scroll-m-20 text-xl font-semibold tracking-tight">
                                {"@nick"}
                            </h4>
                            {!video ?
                                <video ref={remoteVideoRef} autoPlay style={{ width: '100%' }} />
                                :
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    Wating to Accept call request
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
