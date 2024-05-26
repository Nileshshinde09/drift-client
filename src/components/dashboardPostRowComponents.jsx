import React from 'react'
import {
    Edit2,
    Trash2,
    CircleOff
} from "lucide-react"
import { humanReadableDate } from '@/utils'
import { Badge } from "@/components/ui/badge"
import { TableRow, TableCell } from './ui/table'
import { useDashboardPosts } from '@/hooks'
import { useToast } from './ui/use-toast'
import { Post } from '@/services'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updatePost } from '@/app/slices/managePostsSlice'
const dashboardPostRowComponents = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [refresh, setRefresh] = useState(false)
    const [data, fetchingError, isFetching] = useDashboardPosts(refresh)
    const deletePostHandler = async (postId) => {
        if (postId) {
            try {
                const response = await Post.deletePost(postId)
                if (response.data.success) {
                    toast(
                        {
                            title: "Success!",
                            descirption: "Post deleted successfully !!",
                        }
                    )
                }
                setRefresh(!refresh)
            } catch (error) {
                toast(
                    {
                        title: "Failed !!",
                        description: error.message || "Something went wrong while deleting post",
                        variant: "destructive"
                    }
                )
            }
        }
    }
    const editPostHandler = () => {

    }
    return (
        <>
            {
                data && data.map((post) => {
                    return (
                        <TableRow key={post?._id}>
                            <TableCell className="hidden sm:table-cell">
                                {
                                    post?.video == null ?
                                        "Image Post" :
                                        "Video Post"
                                }
                            </TableCell>
                            <TableCell className="font-medium">
                                {post.caption || "No Caption"}
                            </TableCell>
                            <TableCell>
                                {
                                    post?.tags?.map((tag) => {
                                        return <Badge key={tag} variant="outline">{tag}</Badge>
                                    })
                                }
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {post?.comments || 0}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {post?.likes || 0}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {humanReadableDate(post?.createdAt) || "Not Available"}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                {humanReadableDate(post?.updatedAt) || "Not Available"}
                            </TableCell>
                            <TableCell>
                               <Link to={`/edit-post/${post?._id}`}><Edit2 className='cursor-pointer hover:scale-125 hover:transition-transform' variant="outline" onClick={()=>dispatch(updatePost({updatePostData:post}))} ></Edit2></Link>
                            </TableCell>
                            <TableCell>
                                <Trash2 className='cursor-pointer hover:scale-125 hover:transition-transform' onClick={() => deletePostHandler(post?._id)} variant="outline"></Trash2>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}

export default dashboardPostRowComponents
