import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Profile } from '@/services'
import { cn } from '@/lib/utils'

const FindeUserAvatar = ({ avatar = null, username,className }) => {
    const [avt, setAvt] = useState(null)

    useEffect(() => {
        ; (async () => {
            if (avatar) {
                const response = await Profile.getProfileImageById(avatar)
                setAvt(response?.data?.data?.response?.URL);
            }
        })();
    }, [avatar])
    return (
        <Avatar className={cn("mx-2",className)}>
            <AvatarImage src={avt || "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
    )
}

export default FindeUserAvatar