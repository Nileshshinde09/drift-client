import React, { useEffect } from 'react'
import { AvatarImage } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { humanReadableDate } from '@/utils'
import { Link } from 'react-router-dom'
import { Avatar } from './ui/avatar'
import { useProfileImage } from '@/hooks'
import { PROFILE_DUMMY_IMAGE_URL } from '@/constants'
import { X } from 'lucide-react'
import { setPost } from '@/app/slices/postSlices'
import { useDispatch } from 'react-redux'
import {useBookmarkUnbookmark} from '@/hooks'
const bookmarkCard = ({post}) => {
    const [url, setId,profileImageIsLoading,profileError]=useProfileImage()
    const [bookmarkState, bookmarkError, bookmarkIsLoading, BookmarkUnbookmark]=useBookmarkUnbookmark({PostId:post?._id})
    const dispatch = useDispatch()
    const bookUnbookMarkHandler=()=>{
        BookmarkUnbookmark()
    }
    
    const setPostTOStore=()=>{
        dispatch(setPost({postData:post}))
    }

    useEffect(()=>{
        if(post?.owner?.avatar){
            setId(post?.owner?.avatar)
        }
    },[post])
    return (
        <div className='text-center relative'>
            <X className='absolute cursor-pointer' onClick={bookUnbookMarkHandler}/>
            <Link onClick={setPostTOStore} to={`/post/${post?._id}`}>
           {post?.tags && <Badge variant="outline">{post?.tags}</Badge>}
            <p className="text-xl text-muted-foreground">
               {post?.caption || ""}
            </p>
            <p className="text-sm text-muted-foreground">{humanReadableDate(post?.createdAt)}</p>
            <div className={`mx-10 my-4 flex justify-center`}>
                <div className="w-fit flex space-x-4 flex-wrap">
                    <Avatar className="my-auto w-10 h-fit">
                        <AvatarImage src={url || PROFILE_DUMMY_IMAGE_URL} alt="@user" />
                    </Avatar>
                    <div>
                        <div className="text-lg"><p className="leading-7 [&:not(:first-child)]:mt-6">{post?.owner?.username ? post?.owner?.username : null}</p></div>
                        <div className="text-sm flex"><p className="leading-7 [&:not(:first-child)]:mt-6">{post?.owner?.fullName ? post?.owner?.fullName : null}</p></div>
                    </div>
                </div>
            </div>
        </Link>
        </div>
    )
}

export default bookmarkCard