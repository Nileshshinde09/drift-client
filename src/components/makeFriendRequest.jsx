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
  const MakeFriendRequest = ({ children ,toUserId}) => {
    const userData = useSelector(state => state.auth.userData);
    return (
      <Dialog>
        <DialogTrigger asChild>
          {
            children
          }
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Group Menue</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>
            
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default MakeFriendRequest;


  

  