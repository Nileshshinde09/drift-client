import React from 'react'
import { useParams } from 'react-router-dom'
import { CallWindow } from '@/components';
const Call = () => {
  const { type, userId } = useParams()
  return (
    <>
      <div className='absolute inset-0 flex items-center justify-center mt-[3rem]'>
        {
          <CallWindow video={type === 'v' ? true : false } audio={true}/>
        }
      </div>
    </>
  )
}

export default Call