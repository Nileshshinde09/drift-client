import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Profile } from '@/services'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
const MessangerUserProfileId = ({ username, className, chat }) => {
    const user = useSelector(state => state.auth.userData);
    const [avt, setAvt] = useState(null)

    useEffect(() => {
        let avatar=null
        ; (async () => {
            chat?.participants?.forEach((part) => {
                if (part._id !== user?._id) {
                    avatar=part?.avatar;
                }
            })
            if(avatar){
                const response = await Profile.getProfileImageById(avatar)
                setAvt(response?.data?.data?.response?.URL);
            }
        })();
    }, [chat])
    return (
        <Avatar className={cn("mx-2", className)}>
            <AvatarImage src={avt || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
    )
}

export default MessangerUserProfileId