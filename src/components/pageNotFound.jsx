import React from 'react'
import { MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3 } from '@/constants'
const pageNotFound = () => {
  return (
    <div className='flex justify-center items-center content-center'>
      <img src={MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3} className='w-full' alt="Page Not Found" />
    </div>
  )
}

export default pageNotFound
