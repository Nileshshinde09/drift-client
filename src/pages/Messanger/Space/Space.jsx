import { SendChat, ShowSpaceMessages } from '@/components';
import { useDocumentTitle, useInitializeGroupChat, useInitializeSpace } from '@/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Space = () => {
  const { recieverId } = useParams()
  const [setRecieverId] = useInitializeSpace()
  useEffect(() => {
    if (!recieverId) return;
    setRecieverId(recieverId)
  }, [recieverId])

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-1 overflow-auto'>  
          <ShowSpaceMessages /> 
      </div>
      <div className='fixed bottom-4 flex justify-center items-center'>
        <div className='w-full max-w-lg px-4'>
            <SendChat type={"space"}/>
        </div>
      </div>
    </div>
  )
}

export default Space
