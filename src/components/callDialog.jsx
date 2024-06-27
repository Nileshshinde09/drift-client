import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AnoAvatarsCollectionCard } from "."
import { Separator } from "./ui/separator"
import { useNavigate } from "react-router-dom"
import { PhoneCall, Video } from "lucide-react"
import { useDispatch,useSelector } from "react-redux"
import { setIds } from "@/app/slices/callSlice"
const CallDialog = ({ children, callType = 'av' }) => {
    const existingUser = useSelector(state => state.auth.userData)
    const dispatch = useDispatch();
    const FriendList = [{
        username: "nick",
        _id: "6637dacd70735376e2f90c3c",
        email: "nilesh@gmail.com",
        avatar: "6637d199b8b260142c5cecce",
        fullName: "Nilesh Shinde"
    }]
    const navigate = useNavigate()
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    children
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">{callType === "v" ? "Voice" : "Video"} Call With Friends</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {
                        FriendList && FriendList.map((friend, index) => {
                            return (
                                <>
                                    <div key={index} onClick={() => {
                                        dispatch(setIds(
                                            {
                                                callerId: existingUser?._id,
                                                receiverId: friend?._id
                                            }
                                        ))
                                        navigate(`/call/${callType}/${friend._id}`)
                                    }
                                    } className="cursor-pointer grid grid-cols-4 items-center justify-center gap-4">
                                        <AnoAvatarsCollectionCard
                                            username={friend.username}
                                            fullName={friend.fullName}
                                            className={"mx-auto"}
                                        />
                                        <Separator orientation="vertical" />
                                        {callType === "v" ? <PhoneCall className="text-green-400 " /> :
                                            <Video className="text-green-400 " />}
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default CallDialog;