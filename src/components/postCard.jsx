import React, { useEffect, useState, useRef } from "react";
import HoverCard from "./hoverCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  ThumbsUp,
  MessageSquare,
  Bookmark,
  VolumeX,
  Volume2,
  Play,
  Pause,
  Share2,
} from "lucide-react";
import ImageCarousel from "./carousel";
import { CommentSheet, Share } from ".";
import { useDispatch, useSelector } from "react-redux";
import { OpenPostComments } from "@/app/slices/commentSlice";
import { useToast } from "./ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useBookmarkUnbookmark } from "@/hooks";
import { useLikeUnlike } from "@/hooks";
import { Separator } from "./ui/separator";
import { VITE_HOST_URL } from "@/constants";
const PostCard = ({ post }) => {
  const { toast } = useToast();
  const [comment, setComment] = useState(false);
  const [like, setLike] = useState(post.isliked || false);
  const [bookmark, setBookmark] = useState(post.isbookmarked || false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const dispatch = useDispatch();
  const commentsState = useSelector((state) => state.comments.toggleComment);
  const [bookmarkState, bookmarkError, isLoadingBookmark, BookmarkUnbookmark] = useBookmarkUnbookmark({ PostId: post._id });
  const [likeState, likeError, isLoadingLike, LikeUnLike] = useLikeUnlike({ PostId: post._id });
  const videoRef = useRef(null);
  console.log(post);
  
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
    BookmarkUnbookmark();
  };

  const handlePostLikeUnLike = async () => {
    LikeUnLike();
  };

  const handleMouseEnter = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current && !isPlaying) {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  return (
    <Card className="md:w-[400px] w-[350px]">
      <div className="flex justify-between">
        <HoverCard creator={post.creator} />
        <div className="m-2">
        <Share className="" url={VITE_HOST_URL + "/video-feed"} shareType={"Post"} username={post.creator.username}>
          <Share2 />
        </Share>
        </div>
      </div>
      <CardContent>
        <div className="flex w-full items-center justify-center gap-4">
          {!post.video ? (
            <ImageCarousel nextNpreviousArrows={false} images={post.images} />
          ) : (
            <div
              className="relative w-full"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <video
                ref={videoRef}
                src={post.video}
                muted={isMuted}
                controls={false}
                className="w-full"
                onTimeUpdate={handleTimeUpdate}
              />
              <div
                className="absolute bottom-0 left-0 h-1 bg-red-600"
                style={{ width: `${videoProgress}%` }}
              ></div>
              <button
                onClick={togglePlayPause}
                className="absolute bottom-2 left-2 p-2 bg-gray-800 bg-opacity-50 rounded-full"
              >
                {isPlaying ? <Pause className="text-white" /> : <Play className="text-white" />}
              </button>
              <button
                onClick={toggleMute}
                className="absolute bottom-2 right-2 p-2 bg-gray-800 bg-opacity-50 rounded-full"
              >
                {isMuted ? <VolumeX className="text-white" /> : <Volume2 className="text-white" />}
              </button>
            </div>
          )}
        </div>
        <div>
          {post.tags && post.tags.map((tag) => (
            tag && (
              <div className="mx-3 my-1" key={tag}>
                <Badge>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{tag}</h4>
                </Badge>
              </div>
            )
          ))}
        </div>
      </CardContent>
      <CardTitle>

        <div className="flex space-x-7 justify-center">
          <div>
            <ThumbsUp
              onClick={() => {
                setLike(!like);
                handlePostLikeUnLike();
              }}
              className={like ? "fill-white stroke-black cursor-pointer" : "cursor-pointer"}
            />
            <p className="text-sm text-center text-muted-foreground">{post.likes}</p>
          </div>
          <CommentSheet>
            <div>
              <MessageSquare
                onClick={() => setComment(!comment)}
                className={comment ? "fill-white stroke-black cursor-pointer" : "cursor-pointer"}
              />
              <p className="text-sm text-center text-muted-foreground">{post.comments}</p>
            </div>
          </CommentSheet>
          <Bookmark
            onClick={() => {
              setBookmark(!bookmark);
              handleBookmarkUnbookmark();
            }}
            className={bookmark ? "fill-white stroke-black cursor-pointer" : "cursor-pointer"}
          />
        </div>
      </CardTitle>
      <Separator className="w-[90%] mx-auto my-2" />
      <CardFooter>
        <CardDescription className="mt-10 mx-auto">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {post.caption || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "}
          </h4>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
