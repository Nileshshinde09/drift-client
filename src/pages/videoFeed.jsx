import React, { useEffect, useState } from 'react'
import { PostCard } from '@/components'
import { Post } from '@/services'
import { useSelector } from 'react-redux'
import { useDocumentTitle } from 'usehooks-ts'
import { useParams } from 'react-router-dom'
const VideoFeed = () => {
  const {username} =useParams();
   
  const user=useSelector(state=>state.auth.userData)
  useDocumentTitle(`${user?.username} Feed 💎Drift`)
  const [feedPostRespose, setFeedPostRespose] = useState(null)
  
  useEffect(() => {
    if(username) return;
    ; (async () => {
      const posts = await Post.getFeedPost()
      setFeedPostRespose(posts.data.data.followees)
    }
    )()
  }, [])
  useEffect(() => {
    if(!username) return;
    ; (async () => {
      const posts = await Post.getAllRemoteUserPost({username:username.replace("@","")})
      console.log(posts);
      
      setFeedPostRespose(posts.data.data.fetchedPost)
    }
    )()
  }, [])
  return (
    <>
      {
        feedPostRespose ?
          <div className='overflow-y-scroll absolute py-12 no-scrollbar'>
            <div className='flex flex-wrap h-screen space-y-10 no-scrollbar justify-center space-x-4'>
              <div></div>
              {
                feedPostRespose && feedPostRespose.map((post) => {
                  if (post.video) {
                    return (
                      <>
                        <div key={post._id} className="">
                          <PostCard post={post}/>
                        </div>
                      </>
                    )
                  }
                })
              }
              <div className='py-20'></div>
            </div>

          </div>
          :
          <h1 className='sm:text-7xl text-4xl flex justify-center opacity-20 font-bold'>No Post Available</h1>
      }
    </>
  )
}

export default VideoFeed
