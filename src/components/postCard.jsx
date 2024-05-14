import React, { useState } from "react"
import HoverCard from "./hoverCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ThumbsUp,
  MessageSquare,
  ThumbsDown,
  Bookmark
} from "lucide-react"
import ImageCarousel from "./carousel"
import { CommentSheet } from "."
const postCard = ({ images, caption = "", creator = "" }) => {
  const [comment, setComment] = useState(false)
  const [like, setLike] = useState(false)
  const [disLike, setDisLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  return (
    <Card className="md:w-[400px] w-[350px]">
      {/* <CardHeader>
      </CardHeader> */}
      <div className="flex justify-center">
        <HoverCard creator={creator} />
      </div>
      <CardContent>
        <form>
          <div className="flex w-full items-center justify-center gap-4">
            <ImageCarousel nextNpreviousArrows={false} images={images} />
          </div>
        </form>
      </CardContent>
      <CardTitle>
        <div className="flex space-x-7">
          <div></div>
          <div>
            <ThumbsUp onClick={() => {
              setLike(!like)
              setDisLike(false)
            }} className={like ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
            <p className="text-sm text-center text-muted-foreground">{1}</p>
          </div>
          {/* <div>
            <ThumbsDown onClick={() => {
              setDisLike(!disLike)
              setLike(false)
            }} className={disLike ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
            <p className="text-sm text-center text-muted-foreground">{1}</p>
          </div> */}
          <CommentSheet>
            <div>
            <MessageSquare onClick={() => setComment(!comment)} className={comment ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
            <p className="text-sm text-center text-muted-foreground">{1}</p>
          </div>
          </CommentSheet>
          <Bookmark onClick={() => setBookmark(!bookmark)} className={bookmark ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
        </div>
      </CardTitle>
      <CardFooter>
        <div>
          <CardDescription className="mt-10 mx-auto">{caption || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "}</CardDescription>
        </div>
      </CardFooter>
    </Card>
  )
}

export default postCard
