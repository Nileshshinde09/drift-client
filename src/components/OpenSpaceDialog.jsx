import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { GroupChat } from "@/services"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "./ui/input"
import { setChatRoomData } from "@/app/slices/messangerSlice"
import { useNavigate } from "react-router-dom"
import { Loader } from "lucide-react"
import { useInitializeGroupChat } from "@/hooks"
const OpenSpaceDialog = ({children,isLoading,spaceData}) => {
    const [setRecieverGroupId] = useInitializeGroupChat()
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const spaceHandler=()=>{
        if(!spaceData) return;
        setRecieverGroupId(spaceData._id)
        navigate(`/messanger/space/${spaceData._id}`)
    }
    const postHandler=()=>{
        navigate('/')
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center"></DialogTitle>
                </DialogHeader>
                <div className="">
                    <div className="flex justify-center my-3 space-x-3 ">
                        <Button onClick={postHandler}>{!isLoading?"Post":<Loader className='animate-spin'/>}</Button>
                        <Button onClick={spaceHandler}>{!isLoading?"Space":<Loader className='animate-spin'/>}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default OpenSpaceDialog;