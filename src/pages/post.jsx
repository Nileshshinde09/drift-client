import React, { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { CardLayout, HoverCard, ImageCarousel, Loading, CommentSheet } from '@/components';
import { Badge } from "@/components/ui/badge";
import { Bookmark, ThumbsUp, MessageSquare, Pause, Play, VolumeX, Volume2 } from 'lucide-react';
import { useFetchPostById, useMediaIdToUrl, useBookmarkUnbookmark, useLikeUnlike, useDocumentTitle } from '@/hooks';
import { OpenPostComments } from "@/app/slices/commentSlice";
import { CloudMedia } from '@/services';

const Post = () => {
  const user = useSelector(state => state.auth.userData);
  useDocumentTitle(`${user?.username} Post 💎 Drift`);
  const dispatch = useDispatch();
  const { post_id } = useParams();

  const post = useSelector(state => state.post.postData);
  const [data, fetchingError, isFetching, setIdForPost] = useFetchPostById();
  const [postData, setPostData] = useState(null);
  const [setIdList, urlList] = useMediaIdToUrl();
  const [comment, setComment] = useState(false);
  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const commentsState = useSelector(state => state.comments.toggleComment);

  const [videoURL, setVideoURL] = useState(null);
  const [bookmarkState, bookmarkError, isLoadingBookmark, BookmarkUnbookmark] = useBookmarkUnbookmark({ PostId: post_id });
  const [likeState, likeError, isLoadingLike, LikeUnLike] = useLikeUnlike({ PostId: post_id });

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  const handleVideo = async () => {
    const response = await CloudMedia.getVideoById(postData?.video);
    if (response) setVideoURL(response?.data?.data?.response?.URL);
  };

  useEffect(() => {
    if (!post && post_id) {
      setIdForPost(post_id);
    }
    if (post) setPostData(post);
    if (data) setPostData(data);
    if (postData?.images) setIdList(postData?.images);
    if (postData?.video) handleVideo();
  }, [post, data, postData, post_id, setIdForPost, setIdList]);

  useEffect(() => {
    if (comment && post_id) {
      dispatch(OpenPostComments({
        postId: post_id,
        commentsList: [],
      }));
    }
  }, [comment, post_id, dispatch]);

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
    <div>
      {!isFetching ? (
        <Card className="w-fit h-auto mx-auto relative">
          <CardContent className="space-y-3">
            <CardLayout className="hover:scale-100">
              <HoverCard />
              <div className="flex justify-center">
                {postData?.images && <ImageCarousel images={urlList} />}
              </div>
              {postData?.video && (
                <div
                  className="relative w-full max-w-3xl mx-auto"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <video
                    ref={videoRef}
                    src={videoURL}
                    muted={isMuted}
                    className="w-full h-auto max-h-[80vh]"
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
              {postData?.tags?.map((badge, index) => (
                <Badge key={index} variant="secondary">{badge}</Badge>
              ))}
              <div className="flex space-x-7 my-3">
                <ThumbsUp
                  onClick={() => {
                    setLike(!like);
                    handlePostLikeUnLike();
                  }}
                  className={like ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'}
                />
                <CommentSheet>
                  <MessageSquare
                    onClick={() => setComment(!comment)}
                    className={comment ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'}
                  />
                </CommentSheet>
                <Bookmark
                  onClick={() => {
                    setBookmark(!bookmark);
                    handleBookmarkUnbookmark();
                  }}
                  className={bookmark ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'}
                />
              </div>
              <p className="leading-7 text-wrap">{postData?.caption}</p>
            </CardLayout>
          </CardContent>
        </Card>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Post;
