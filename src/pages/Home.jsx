import { Button } from '@/components/ui/button'
import React,{useState} from 'react'
import { setTheme } from '@/app/slices/themeSlice.js'
import { useDispatch } from 'react-redux'
import { AppLayout } from '.'
import {PostCard} from '@/components'
import {Pagination} from "@/components"
const Home = () => {
const dispatch = useDispatch()

return (
  <>
  <div className='overflow-y-scroll absolute py-12 '>
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

export default Home
