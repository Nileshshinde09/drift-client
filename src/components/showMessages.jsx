import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Message } from '.';
import { PROFILE_DUMMY_IMAGE_URL } from '@/constants';
import { useProfileImage } from '@/hooks';

const ShowMessages = () => {
  const [url, setId,isLoading,profileError] =useProfileImage();
  const [online, setOnline] = useState(false);
  const [participantName, setParticipantName] = useState(null)
  const [participantAvatar, setParticipantAvatar] = useState(null)
  const isTyping = useSelector((state) => state.messanger.isTyping);
  const messages = useSelector((state) => state.messanger.messageList);
  const userId = useSelector((state) => state.auth.userData);
  const image = useSelector((state) => state.auth.profileImageUrl);
  const typingEntityName = useSelector(state => state.messanger.TypingEntityName)
  const chatData = useSelector(state => state.messanger.currentChatRoomData)
  const messangerTheme = useSelector((state)=>state.theme.messangerTheme)
  const [theme,setTheme]=useState(messangerTheme)
  
  const messageList = useMemo(() => {
    return messages.length > 0 ? [...messages].reverse() : [];
  }, [messages]);
  useEffect(() => {
    if (!chatData) return;
    chatData.data.participants.map((participant) => {
      if(participant._id===userId._id) return;
      setParticipantName(participant.username)
      setId(participant.avatar)
    })
  }, [chatData])
  return (
    <div className='absolute top-0 text-center bg-black w-full h-full'>
      <div className='bg-white space-x-3 flex items-center relative mt-2 h-14 w-1/2 rounded-md mx-auto'>
        <img
          src={url||PROFILE_DUMMY_IMAGE_URL}
          width={40}
          height={40}
          alt="Avatar"
          className="overflow-hidden m-2 bg-black rounded-full"
        />
        <p className="leading-9 text-black font-semibold my-5">{participantName||""}</p>
        <div className={`transition w-3 h-3 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`}></div>
        {isTyping && (
          <>
            <h1 className="leading-9 text-black font-semibold my-5 transition flex">
              {typingEntityName}
            </h1>
          </>
        )}
      </div>

      <div className={`relative h-[33rem] ${theme} shadow-2xl border-2 border-orange-100 bg-muted rounded-3xl w-1/2 mx-auto mt-5 no-scrollbar px-3 py-10 space-y-2 overflow-y-scroll`}>
        {messageList.map((message) => (
          <Message
            key={message._id}
            type={message.sender._id === userId?._id ? 'y' : ''}
            payload={message.content}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowMessages;
