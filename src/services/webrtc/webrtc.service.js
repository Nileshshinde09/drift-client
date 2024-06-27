import { Calls } from "../Call/calls.service";

class PeerService {
  constructor(receiverId) {
    this.peer = null;
    this.createPeer(receiverId);
    
  }

  createPeer(receiverId) {
    this.peer = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' }
      ],
    });

    this.peer.onicecandidate = async (event) => {
      if (event.candidate && receiverId) {
        await Calls.initializeCall(event.candidate, receiverId);
      }
    };

    this.peer.ontrack = event => {
      console.log('Remote track added:', event.streams[0]);
      if (this.onRemoteStream) {
        this.onRemoteStream(event.streams[0]);
      }
    };
  }

  async getAnswer(offer) {
    if (this.peer) {
      if (this.peer.signalingState !== 'stable') {
        console.error('Peer connection is not stable. Current state:', this.peer.signalingState);
        return;
      }
      await this.peer.setRemoteDescription(offer);
      const answer = await this.peer.createAnswer();
      await this.peer.setLocalDescription(answer);
      return answer;
    }
  }

  async setRemoteDescription(description) {
    if (this.peer) {
      if (this.peer.signalingState !== 'have-local-offer') {
        console.error('Peer connection is not in "have-local-offer" state. Current state:', this.peer.signalingState);
        return;
      }
      await this.peer.setRemoteDescription(description);
    }
  }

  async addIceCandidate(candidate) {
    if (this.peer) {
      try {
        await this.peer.addIceCandidate(candidate);
      } catch (error) {
        console.error('Error adding received ice candidate', error);
      }
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    }
  }

  addLocalStream(stream) {
    if (this.peer) {
      stream.getTracks().forEach(track => this.peer.addTrack(track, stream));
    }
  }

  setOnRemoteStream(callback) {
    this.onRemoteStream = callback;
  }
}

export {
  PeerService
}
