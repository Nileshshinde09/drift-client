import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { AddFriendListDrawer, GroupParticipantSheet, LeaveGroup, RenameGroup } from "."
import { useSelector } from "react-redux"
import { VenetianMaskIcon, Image } from "lucide-react"
import { useNavigate } from "react-router-dom"
const CreatePostDialog = ({ children }) => {

    // const userData = useSelector(state => state.auth.userData);
    const navigate=useNavigate()
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    children
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Posts</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap space-y-4 justify-between">
                    <div/>
                    <Button onClick={()=>navigate("/create-post")} className="">Create Post <Image className="mx-2" /></Button>
                    <Button onClick={()=>navigate("/journeyjournals/create")} className="">Create journy Journal <VenetianMaskIcon className="mx-2" /></Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePostDialog;


