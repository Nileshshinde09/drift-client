import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { notificationSonnar } from '@/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const useNotifications = () => {
  const navigate = useNavigate();
  const socket = useSelector(state => state.socket.socket)
  useEffect(() => {
    if (socket) {
      socket.on('notification', (data) => {
        console.log(data);
        toast(data?.message || "No Message", {  
          description: data?.message || "No Message",
          action: {
            label: "Open",
            onClick: () => navigate(data?.url || '/'),
          },
          duration:60*1000,
          closeButton:true
        });
      });

      socket.on('call-notification',()=>{
        console.log("Call");
        console.log(data)
      })

      return () => {
        socket.off('notification');
        socket.off('call-notification');
      };
    }
  }, [socket]);
};
export default useNotifications;

