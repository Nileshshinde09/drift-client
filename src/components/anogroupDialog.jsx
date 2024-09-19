import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "./ui/button"
  import { AddFriendListDrawer, AddFriendToSpace, AnoGroupParticipantSheet, GroupParticipantSheet, LeaveGroup, RenameGroup } from "."
  import { useSelector } from "react-redux"
  const AnoGroupDialog = ({ children }) => {
    const groupChatData = useSelector(state => state.messanger.currentChatRoomData)
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
          <div className="flex flex-wrap space-y-4">
            <div />
            <div className="flex space-x-3">
              <  AnoGroupParticipantSheet/>
              {groupChatData?.admin===userData?._id && <  AnoGroupParticipantSheet showParticipants={false} />}{/* group admin only access this feature */}
            </div>
            <div className="flex space-x-3">
              {groupChatData?.admin===userData?._id&&<AddFriendToSpace><Button>Add participants</Button></AddFriendToSpace>}{/* group admin only access this feature */}
              {/* {groupChatData?.admin===userData?._id&&<RenameGroup><Button>Rename group</Button></RenameGroup>}group admin only access this feature */}
            </div>
            <div className="flex space-x-3">
              {/* <LeaveGroup><Button>Leave group</Button></LeaveGroup> */}
              {/* {groupChatData?.admin===userData?._id&&<LeaveGroup><Button>Delete Group</Button></LeaveGroup>}group admin only access this feature */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default AnoGroupDialog;