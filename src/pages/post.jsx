import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CardLayout } from '@/components';
import { HoverCard } from '@/components';
import { ImageCarousel } from '@/components';
import { useSelector } from 'react-redux';
import { useFetchPostById,useMediaIdToUrl,useBookmarkUnbookmark,useLikeUnlike } from '@/hooks';
import { Badge } from "@/components/ui/badge"
import { Loading } from '@/components';
import { CommentSheet } from '@/components';
import { Bookmark,ThumbsUp,MessageSquare } from 'lucide-react';
import { OpenPostComments } from "@/app/slices/commentSlice"
import { useDispatch } from 'react-redux';
const Post = () => {
  const dispatch = useDispatch()

  const post = useSelector((state) => state.post.postData)
  const [data, fetchingError, isFetching, setIdForPost] = useFetchPostById()
  const { post_id } = useParams();
  const [postData, setPostData] = useState(null)
  const [setIdList, urlList, isConverting] = useMediaIdToUrl()
  const [comment, setComment] = useState(false)
  const [like, setLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const commentsState = useSelector((state) => state.comments.toggleComment)
  const [bookmarkState, bookmarkError, isLoadingBookmark, BookmarkUnbookmark] = useBookmarkUnbookmark({ PostId: post_id })
  const [likeState, likeError, isLoadingLike, LikeUnLike] = useLikeUnlike({ PostId: post_id })
  useEffect(() => {
    if (!post && post_id) {
      setIdForPost(post_id)
    }
    if (post) setPostData(post)
    if (data) setPostData(data)
    if (postData) setIdList(postData?.images)
  }, [post, data, postData])
  useEffect(() => {
    if (comment && post_id) {
      dispatch(OpenPostComments({
        postId:post_id,
        commentsList: [],
      }));
    }
  }, [comment,post_id, dispatch]);
  useEffect(() => {
    if (!commentsState) {
      setComment(false);
    }
  }, [commentsState]);
  const handleBookmarkUnbookmark = async () => {
    BookmarkUnbookmark()
  }

  const handlePostLikeUnLike = async () => {
    LikeUnLike()
  }
  return (
    <div>
      {!isFetching ? <Card className={`w-[500px] mx-auto relative`}>
        <CardContent className="space-y-3">
          <div />
          <CardLayout className={"hover:scale-105"}>
            <HoverCard />
            <div className="flex justify-center">
              <ImageCarousel className="" images={urlList} />
            </div>
            {postData && postData?.tags?.map((badge) => (
              <Badge variant="secondary">{badge}</Badge>
            ))}
            <div className="flex space-x-7 my-3">
          <div></div>
          <div>
            <ThumbsUp onClick={() => {
              setLike(!like)
              handlePostLikeUnLike()
            }} className={like ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
            <p className="text-sm text-center text-muted-foreground">{postData?.likes}</p>
          </div>
          <CommentSheet>
            <div>
              <MessageSquare onClick={() => setComment(!comment)} className={comment ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
              <p className="text-sm text-center text-muted-foreground">{postData?.comments}</p>
            </div>
          </CommentSheet>
          <Bookmark onClick={() => {
            setBookmark(!bookmark)
            handleBookmarkUnbookmark()
          }} className={bookmark ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
        </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              {"The king, seeing how much happier his subjects were, realized the error ofhis ways and repealed the joke tax."}
            </p>
          </CardLayout>
        </CardContent>
      </Card> : <Loading />}
    </div>
  )
}

export default Post