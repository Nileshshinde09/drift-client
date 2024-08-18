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
import { useDispatch, useSelector } from "react-redux"
import { VenetianMaskIcon, Image } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {logout } from "@/app/slices/authSlices"
const ChangePasswordLogoutDialog = ({ children }) => {
    const dispatch = useDispatch()

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
                    <DialogTitle className="text-center text-red-400">Keep in mind that when you chick on Forgot password you will automatically get log out.</DialogTitle>
                </DialogHeader>
                <div className="flex flex-wrap space-y-4 justify-center">
                    <div/>
                    <Button onClick={
                        ()=>{
                            dispatch(logout())
                            navigate("/forgot-password")
                        }
                    } className="">Forgot Password</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ChangePasswordLogoutDialog;
