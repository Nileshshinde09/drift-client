import React, { useEffect, useState } from "react"
import HoverCard from "./hoverCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  ThumbsUp,
  MessageSquare,
  Bookmark
} from "lucide-react"
import ImageCarousel from "./carousel"
import { CommentSheet } from "."
import { useDispatch, useSelector } from "react-redux"
import { OpenPostComments } from "@/app/slices/commentSlice"
import { Bookmarks,Likes } from "@/services"
import { useToast } from "./ui/use-toast"
const postCard = ({ post }) => {
  console.log(post.isliked, post.isbookmarked);
  const { toast } = useToast()
  //----------------🪝🪝hooks🪝🪝-------------------
  const [comment, setComment] = useState(false)
  const [like, setLike] = useState(post.isliked || false)
  const [bookmark, setBookmark] = useState(post.isbookmarked || false)
  const dispatch = useDispatch()
  const commentsState = useSelector((state) => state.comments.toggleComment)
  //----------------😎😎 Dispatch data 😎😎-------------------

  // Dispatch action if comment and Id are set
  useEffect(() => {
    if (comment && post._id) {
      dispatch(OpenPostComments({
        postId: post._id,
        commentsList: [],
      }));
    }
  }, [comment, post._id, dispatch]);

  // Update local state based on commentsState
  useEffect(() => {
    if (!commentsState) {
      setComment(false);
    }
  }, [commentsState]);

  const handleBookmarkUnbookmark = async () => {
    const bookmarkUnbookmarkRespose = await Bookmarks.bookmarkUnbookmark(post._id)

    try {
      if (bookmarkUnbookmarkRespose.data) {
        toast({
          title: "Success!",
          description: bookmarkUnbookmarkRespose.data.message
        });
        return
      }
    } catch (error) {
      setBookmark(!bookmark)
      console.log(error);
    }
  }

  const handlePostLikeUnLike = async () => {
    const postLikeUnLikeRespose = await Likes.likeUnlikePost(post._id)
    try {
      if (postLikeUnLikeRespose.data) {
        toast({
          title: "Success!",
          description: postLikeUnLikeRespose.data.message
        });
        return
      }
    } catch (error) {
      setLike(!like)
      console.log(error);
    }
  }

  return (
    <Card className="md:w-[400px] w-[350px]">
      <div className="flex justify-center">
        <HoverCard creator={post.creator} />
      </div>
      <CardContent>
        <form>
          <div className="flex w-full items-center justify-center gap-4">
            <ImageCarousel nextNpreviousArrows={false} images={post.images} />
          </div>
        </form>
      </CardContent>
      <CardTitle>
        <div className="flex space-x-7">
          <div></div>
          <div>
            <ThumbsUp onClick={() => {
              setLike(!like)
              handlePostLikeUnLike()
            }} className={like ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
            <p className="text-sm text-center text-muted-foreground">{post.likes}</p>
          </div>
          <CommentSheet>
            <div>
              <MessageSquare onClick={() => setComment(!comment)} className={comment ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
              <p className="text-sm text-center text-muted-foreground">{post.comments}</p>
            </div>
          </CommentSheet>
          <Bookmark onClick={() => {
            setBookmark(!bookmark)
            handleBookmarkUnbookmark()
          }} className={bookmark ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
        </div>
      </CardTitle>
      <CardFooter>
        <div>
          <CardDescription className="mt-10 mx-auto">{post.caption || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "}</CardDescription>
        </div>
      </CardFooter>
    </Card>
  )
}

export default postCard
