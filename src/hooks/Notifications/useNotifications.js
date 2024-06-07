import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notificationSonnar } from '@/utils';

const useNotifications = () => {
  const socket = useSelector((state) => state.socket.socket);

  useEffect(() => {
    if (socket) {
      socket.on('notification', (data) => {
        notificationSonnar({...data})
        console.log('Notification received:', data);
      });

      return () => {
        socket.off('notification');
      };
    }
  }, [socket]);


};

export default useNotifications;

