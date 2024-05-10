import React from 'react'
import {FilterSection,PostCard,Pagination} from '@/components'
const Feed = () => {
  return (
    <>
    <div className='overflow-y-scroll absolute py-12'>
      <div className='flex flex-wrap justify-center space-x-5 h-screen space-y-5 no-scrollbar pb-40'>
      <div></div>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>
      <PostCard/>

    </div>
   
      <Pagination/>
    
    </div>
    </>
  )
}

export default Feed
