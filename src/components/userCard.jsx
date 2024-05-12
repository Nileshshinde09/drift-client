import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const userAvatar = (
    {
        url = "https://res.cloudinary.com/db3pdtxym/image/upload/v1714934153/AnoAvatar/zxeagtki3rlepyahsx3m.png",
        username = "Unkown",
        fullName = "Unkown",
        className
    }) => {
    return (
        <>
            <div className={`mx-10 ${className}`}>
                <div className="w-fit flex space-x-4">
                    <Avatar>
                        <AvatarImage src={url} alt="@user" />
                    </Avatar>
                    <div>
                        <div>{username}</div>
                        <div>{fullName}</div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default userAvatar