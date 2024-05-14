import React, { useEffect, useState } from 'react'
import { PostCard, CommentSheet } from '@/components'
import { Post } from '@/services'
const Feed = () => {
  const [feedPostRespose, setFeedPostRespose] = useState(null)
  useEffect(() => {
    ; (async () => {
      setFeedPostRespose(await Post.getFeedPost())
    }
    )()
  }, [])
  console.log(feedPostRespose);
  return (
    <>

      {
        feedPostRespose ?
            <div className='overflow-y-scroll absolute py-12 no-scrollbar'>
              <div className='h-screen space-y-10 no-scrollbar'>
                <div></div>
                {
                  feedPostRespose && feedPostRespose.data.data.followees.map((post,index) => {
                    if (!post.video) {

                      return (
                        <>
                          <div key={index} className="md:mx-[20rem] mx-[2rem]">
                            <PostCard images={post.images} creator={post.creator} caption={post.caption} />
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
