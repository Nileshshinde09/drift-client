import React, { useEffect, useState, useRef } from 'react'
import { Loading, PostCard } from '@/components'
import { Post } from '@/services'
import { useDocumentTitle, usePagination } from '@/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
const IndividualPost = () => {
  useDocumentTitle(`Posts 💎Drift`)
  const { username } = useParams()
  const fetchData = async (page) => {
    const response = await Post.getAllRemoteUserPost({ username });
    if (response && response.data && response.data.data) {
      return response.data.data.fetchedPost.filter(post => !post.video);
    }
    return [];
  };

  const [data, containerRef, loading, hasMore] = usePagination(fetchData);
  return (
    <>
      {data.length > 0 ? (
        <div className='overflow-y-scroll absolute py-12 no-scrollba h-full w-full' ref={containerRef}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 px-2'>
            {data.map((post) => {
              console.log(post);
              return (
              <div key={uuidv4()} className="flex justify-center">
                <PostCard post={post} showAnalytics={true} />
              </div>
              )
            }
            )}
          </div>
          {loading && <div className="text-center py-4"><Loading /></div>}
          {!hasMore && <div className="text-center py-4">No more posts available.</div>}
        </div>
      ) : (
        <h1 className='sm:text-7xl text-4xl flex justify-center opacity-20 font-bold'>
          No Post Available
        </h1>
      )}
    </>
  );
};

export default IndividualPost