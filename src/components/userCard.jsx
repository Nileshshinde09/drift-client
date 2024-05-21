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
            <div className={`mx-10 flex justify-center ${className}`}>
                <div className="w-fit flex space-x-4 flex-wrap">
                    <Avatar className="my-auto w-40 h-fit">
                        <AvatarImage src={url} alt="@user" />
                    </Avatar>
                    <div>
                        <div className="text-lg"><p className="leading-7 [&:not(:first-child)]:mt-6">{username?username:null}</p></div>
                        <div className="text-sm flex"><p className="leading-7 [&:not(:first-child)]:mt-6">{fullName?fullName:null}</p></div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default userAvatar