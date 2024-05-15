import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    SendHorizonal
} from "lucide-react"
import { Comment } from "."
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { OpenPostComments, ClosePostComments } from "@/app/slices/commentSlice";
import { Comments } from "@/services";
import { useToast } from "./ui/use-toast";

const commentSheet = ({ children }) => {

    const { toast } = useToast();
    const [isSuccess, setIsSuccess] = useState(null);
    const [inputComment, setInnputComment] = useState('')
    const commentsList = useSelector((state) => state.comments.commentsList)
    const postIdForComments = useSelector((state) => state.comments.postIdForComments)
    const dispatch = useDispatch()

    //----------------😎😎 useEffect for rerendering data 😎😎-------------------
    useEffect(() => {
        if (postIdForComments) {
            ; (async () => {
                const commentsOnPostRespose = await Comments.getCommentsOnPost(postIdForComments);
                if (commentsOnPostRespose && postIdForComments)
                    dispatch(OpenPostComments({
                        postId: postIdForComments,
                        commentsList: commentsOnPostRespose.data.data.commentsResponse
                    }))
            })()
            //----->  ;(async()=>{})()   <------- 👈👈This is called IIFE (pronounced iffy), is a function that is called immediately after it is defined
            setIsSuccess(null)
        }
    }, [isSuccess, postIdForComments])

    const handleComment = async () => {
        if (inputComment) {
            const createCommentRespose = await Comments.createOrUpdateCommentOnPost(postIdForComments, inputComment);
            if (createCommentRespose.data.success) {
                setIsSuccess(true)
                let description;
                if (createCommentRespose.data.data.editedComment) {
                    description = createCommentRespose.data.message
                }
                else if (createCommentRespose.data.data.createdComment) {
                    description = createCommentRespose.data.message
                }
                toast({
                    title: "Success!",
                    description
                });
            }
        }

    }
    const handleCloseComments = () => {
        if (postIdForComments) {
            dispatch(ClosePostComments())
        }
    }
    return (
        <Sheet className="relative"
            onOpenChange={handleCloseComments}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Comments</SheetTitle>
                    <div className="flex w-full max-w-sm items-center space-y-2 space-x-2">
                        <div></div>

                        <Input
                            id="inputComment"
                            type="text"
                            name="inputComment"
                            placeholder="comment 😎😎😎"
                            onChange={(e) => {
                                setInnputComment(e.target.value);
                            }}
                        />

                        <SendHorizonal onClick={handleComment} className="hover:scale-125" />

                    </div>
                </SheetHeader>
                <div className="overflow-y-scroll no-scrollbar space-y-5 h-screen">
                    <div></div>
                    {
                        commentsList?.map((comment) => {
                            return <Comment commentator={comment.commentor[0]} content={comment.content} />
                        })
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default commentSheet;