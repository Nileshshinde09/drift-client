import React, { useEffect, useState } from 'react'
import { PostCard } from '@/components'
import { Post } from '@/services'
const Feed = () => {

  const [feedPostRespose, setFeedPostRespose] = useState(null)
  useEffect(() => {
    ; (async () => {
      const posts = await Post.getFeedPost()
      setFeedPostRespose(posts)
    }
    )()
  }, [])

  return (
    <>

      {
        feedPostRespose ?
          <div className='overflow-y-scroll absolute py-12 no-scrollbar'>
            <div className='h-screen space-y-10 no-scrollbar'>
              <div></div>
              {
                feedPostRespose && feedPostRespose.data.data.followees.map((post) => {
                  console.log(post)
                  if (!post.video) {
                    return (
                      <>
                        <div key={post._id} className="md:mx-[20rem] mx-[2rem]">
                          <PostCard post={post} />
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

export default Feed
