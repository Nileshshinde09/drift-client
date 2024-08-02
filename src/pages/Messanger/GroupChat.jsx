import { CreateGroupForm, SendChat, ShowGroupMessages } from '@/components';
import { useInitializeGroupChat } from '@/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const GroupChat = () => {
  const { type, recieverId, createGroup } = useParams()
  if (type === "chat") return <></>;
  const [setRecieverId] = useInitializeGroupChat()
  useEffect(() => {
    if (!recieverId) return;
    setRecieverId(recieverId)
  }, [recieverId])
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 overflow-auto'>  
        {!createGroup === false ?
          <ShowGroupMessages/> : <CreateGroupForm/>
        }
      </div>
      <div className='fixed bottom-4 flex justify-center items-center'>
        <div className='w-full max-w-lg px-4'>
          {!createGroup ?
            <SendChat/> : <SendChat/>
          }
        </div>
      </div>
    </div>
  )
}

export default GroupChat
