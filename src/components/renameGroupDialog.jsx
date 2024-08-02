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

const RenameGroup = ({ children }) => {
    const dispatch = useDispatch()
    const [newName, setNewName] = useState(null)
    const groupChatData = useSelector(state => state.messanger.currentChatRoomData)
    const { toast } = useToast()

    const renameHandler = async () => {
        if (newName.length < 4) {
            return toast({
                variant: "destructive",
                title: `Uh oh! length should be more than 3 character.`,
                action: <ToastAction altText="Try again" onClick={setNewName("")}>Try again</ToastAction>,
            })
        } else if (newName === groupChatData?.name) {
            return toast({
                variant: "destructive",
                title: `Uh oh! New name should not be same as previous one.`,
                action: <ToastAction altText="Try again" onClick={setNewName("")}>Try again</ToastAction>,
            })
        }
        try {
            const response = await GroupChat.renameGroupChat({ name: newName, chatId: groupChatData?._id })
            if(response?.data?.success){
                dispatch(setChatRoomData(response?.data?.data))
                return toast({
                    title: `Renamed successfully!`,
                })
            }
        } catch (error) {
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
                    <DialogTitle className="text-center">Rename Group</DialogTitle>
                </DialogHeader>
                <div className="">
                    <div className="flex justify-center my-3 space-x-3 ">
                        <Input value={newName} placeholder={"Enter new name"} className="text-green-400" onChange={(e) => setNewName(e.target.value)} />
                        <Button onClick={renameHandler}>Rename</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RenameGroup;
