import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notificationSonnar } from '@/utils';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
const useNotifications = () => {
  const sound=useSelector(state=>state.theme.messangerNotificationTheme)
  const navigate = useNavigate();
  const socket = useSelector(state => state.socket.socket)
  const isMute = useState("true"===useSelector(state=>state.theme.isNotificationsMuted))

  useEffect(() => {
    // if(isMute) return;
    if (socket) {
      socket.on('notification', (data) => {
        const audio = new Audio(sound);
        audio.play();
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 5000);
        toast(data?.message || "No Message", {  
          description: data?.payload|| "No Message",
          action: {
            label: "Open",
            onClick: () =>{
              audio.pause()
              navigate(data?.url || '/')},
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
  }, [socket,isMute]);
};
export default useNotifications;

