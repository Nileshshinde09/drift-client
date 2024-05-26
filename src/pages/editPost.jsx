import React, { useEffect } from 'react'
import { EditImagePost } from '@/components'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updatePost } from '@/app/slices/managePostsSlice'
import { useSelector } from 'react-redux'
import { useFetchPostById } from '@/hooks'
const editPost = () => {
  const dispatch = useDispatch();
  const [data,fetchingError,isFetching,setId]=useFetchPostById()
  const post = useSelector(state => state.managePost.updatePostData) 
  const {postId} = useParams();
  useEffect(()=>{
    console.log(post);
    if(!post){
      setId(postId)
    }
    if(data){
      dispatch(updatePost({updatePostData:data}))
    }
  },[postId,data])
  return (
    <div className=' flex justify-center items-center h-[700px] overflow-y-scroll no-scrollbar'>
      <div className='sm:w-1/2'>
        <EditImagePost/>
      </div>
    </div>
  )
}

export default editPost
