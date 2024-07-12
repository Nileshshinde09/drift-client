import { SendChat, ShowMessages } from '@/components';
import { useCreateChat } from '@/hooks';
import React,{useEffect} from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { type, recieverId } = useParams()
    const [setRecieverId,Error]=useCreateChat();
    useEffect(()=>{
        setRecieverId(recieverId)
    },[recieverId])
    if(Error){
        return  toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: Error,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
    }
    return (
        <div className='flex flex-col h-screen'>
            <div className='flex-1 overflow-auto'>
                <ShowMessages />
            </div>
            
            <div className='fixed bottom-4 flex justify-center items-center'>
                <div className='w-full max-w-lg px-4'>
                    <SendChat />
                </div>
            </div>
        </div>
    )
}

export default Chat
