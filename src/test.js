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