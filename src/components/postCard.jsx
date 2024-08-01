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
import { Bookmarks, Likes } from "@/services"
import { useToast } from "./ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useBookmarkUnbookmark } from "@/hooks"
import { useLikeUnlike } from "@/hooks"

const postCard = ({ post }) => {

  //----------------🪝🪝hooks🪝🪝-------------------
  const { toast } = useToast()
  const [comment, setComment] = useState(false)
  const [like, setLike] = useState(post.isliked || false)
  const [bookmark, setBookmark] = useState(post.isbookmarked || false)
  const dispatch = useDispatch()
  const commentsState = useSelector((state) => state.comments.toggleComment)
  const [bookmarkState, bookmarkError, isLoadingBookmark, BookmarkUnbookmark] = useBookmarkUnbookmark({ PostId: post._id })
  const [likeState, likeError, isLoadingLike, LikeUnLike] = useLikeUnlike({ PostId: post._id })
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
        <div>
          {
            post.tags && post.tags?.map((tag) => {
              if (tag === "") return
              return (
                <div className="mx-3 my-1" key={tag}>
                  <Badge><h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{tag}</h4></Badge>
                </div>
              )
            })
          }
        </div>
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
