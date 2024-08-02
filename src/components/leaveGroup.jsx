import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { CornerUpRightIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import { GroupChat } from '@/services'
import { useToast } from './ui/use-toast'
import { useNavigate } from 'react-router-dom'
const LeaveGroup = ({ children }) => {
    const navigate =useNavigate()
    const {toast} =useToast()
    const groupChatData = useSelector(state => state.messanger.currentChatRoomData)
    const handleLeaveGroup=async()=>{
        try {
            const response = await GroupChat.leaveGroupChat({chatId:groupChatData._id})
            if(response.data.success){
                toast({
                    title: `Group ${groupChatData.name} leaved successfully!`,
                })
                navigate("/messanger")

            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: `Uh oh! ${error.message}`,
            })
            console.log(error.message || "Something went wrong while renaming group.")
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    children
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Leave Group <small className="text-2xl font-medium leading-none text-green-500">{groupChatData?.name}</small>.</DialogTitle>
                </DialogHeader>
                <div className="">
                    <div className="flex justify-center my-3 space-x-3 ">
                        <Button onClick={handleLeaveGroup}>Left<CornerUpRightIcon className='mx-1' /></Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LeaveGroup
