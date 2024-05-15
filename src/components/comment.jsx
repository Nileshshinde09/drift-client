import React, { useState } from 'react'
import { CalendarDays, ThumbsDown, ThumbsUp, MessageSquare,Bookmark } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"


const Comment = ({ commentator,content }) => {
    const [comment, setComment] = useState(false)
    const [like, setLike] = useState(false)
    const [disLike, setDisLike] = useState(false)
    const [bookmark, setBookmark] = useState(false)
    
    return (
        <>
            <HoverCard>
                <HoverCardTrigger>
                    <div className="relative text-center rounded bg-muted px-[0.3rem] my-5 py-[0.2rem] font-mono text-sm font-semibold">
                        {content || "hello my self nilesh shinde lorem hello my self😎😎😎 nilesh shinde lorem hello my self nilesh shinde 😁😁😁 lorem hello my self nilesh shinde lorem"}
                        <div className="flex justify-center items-center space-x-7 my-2">
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
                            <div>
                            <MessageSquare onClick={() => setComment(!comment)} className={comment ? `fill-white stroke-black cursor-pointer` : 'cursor-pointer'} />
                            <p className="text-sm text-center text-muted-foreground">{1}</p>
                            </div>

                        </div>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-60">
                    <div className="flex space-x-4">
                        <Avatar>
                            <AvatarImage src={commentator.avatar || "https://github.com/vercel.png"} />
                            <AvatarFallback>VC</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{`@${commentator.username || "username"}`}</h4>
                            <div className="flex items-center pt-2">
                                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                <span className="text-xs text-muted-foreground">
                                    Updated {"🤔🤔🤔"}
                                </span>
                            </div>
                        </div>
                    </div>
                </HoverCardContent>
            </HoverCard >
        </>
    )
}

export default Comment




