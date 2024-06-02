import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { usePreviewImage } from '@/hooks';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { PROFILE_DUMMY_IMAGE_URL } from "@/constants";
const userAvatar = (
    {
        username = "Unkown",
        fullName = "Unkown",
        className
    }) => {
    const profileImageUrl = useSelector(state => state.auth.profileImageUrl);   
    const [file, imageUrl, setFile, setImageUrl] = usePreviewImage()
    const { fileData, status, anoImageUrl, } = useSelector(state => state.updateProfile)
    useEffect(() => {
        if (status && fileData) {
            setFile(fileData);
        }
        if (status && anoImageUrl) {
            setImageUrl(anoImageUrl)
        }
        if (!status && profileImageUrl) {
            setImageUrl(profileImageUrl)
        }
    }, [status, fileData, setFile, anoImageUrl, profileImageUrl]);

    return (
        <>
            <div className={`mx-10 flex justify-center ${className}`}>
                <div className="w-fit flex space-x-4 flex-wrap">
                    <Avatar className="my-auto w-14 h-fit">
                        <AvatarImage src={imageUrl || PROFILE_DUMMY_IMAGE_URL} alt="@user" />
                    </Avatar>
                    <div>
                        <div className="text-lg"><p className="leading-7 [&:not(:first-child)]:mt-6">{username ? username : null}</p></div>
                        <div className="text-sm flex"><p className="leading-7 [&:not(:first-child)]:mt-6">{fullName ? fullName : null}</p></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default userAvatar