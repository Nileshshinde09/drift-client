import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import React from 'react'
import FollowerFollowingCard from "./followerFollowingCard"
import { useState, useEffect } from "react"
import { useFollowers, useFollowing } from "@/hooks"
import { useSelector } from "react-redux"

const followerFollowingSheetLayout = ({ side, type, children, username }) => {
    
    const [followersData, followersLoading,followersError,setUsernameForFollowers] = useFollowers()
    const [followeeData, followeeLoading,followingError, setUsernameForFollowees] = useFollowing()
    useEffect(() => {
        if (username) {
            setUsernameForFollowers(username)
            setUsernameForFollowees(username) 
        }
    }, [username])
    return (
        <Sheet>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent side={side || "left"}>
                <SheetHeader className={"my-2"}>
                    <SheetTitle className="mx-auto">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            {type}
                        </h3>
                    </SheetTitle>
                    <Separator className="w-full" />
                </SheetHeader>
                <div className="overflow-y-scroll no-scrollbar h-screen pb-20">
                    {
                        type==="followers" && followersData && followersData?.map((follower)=>{
                            
                            return <FollowerFollowingCard type={type} entity={follower} />
                            
                        })
                    }
                   {
                        type==="following" && followeeData && followeeData?.map((followee)=>{
                            
                            return <FollowerFollowingCard type={type} entity={followee} />
                            
                        })
                    }

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default followerFollowingSheetLayout


