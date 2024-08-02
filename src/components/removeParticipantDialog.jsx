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
import { useSelector } from "react-redux"

const RemoveParticipantDialog = ({ children, participant, groupChatData }) => {
    const participants = useSelector(state => state.messanger.currentChatRoomData.participants);
    const { toast } = useToast()
    const removeParticipantHandler=async()=>{
        if(participants.length <=2){
            return toast({
                variant: "destructive",
                title: `Uh oh! ${participant.username} is only one participant in this group.`,
                description: "You cannot remove last participant.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
        }
        try {
            await GroupChat.removeParticipantsFromGroupChat(groupChatData._id,participant._id)
        } catch (error) {
           console.log(error.message || "Something went wrong while removing participant.")
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
                    <DialogTitle className="text-center">Remove {participant.username}</DialogTitle>
                </DialogHeader>
                <div className="">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center flex justify-center text-green-500">
                        <span>
                        Kick out <span className="text-red-500">{participant.fullName}</span> from group <span className="text-red-500">{groupChatData?.name}</span>.
                        </span>
                    </h4>
                    <div className="flex justify-center my-3">
                        <Button onClick={removeParticipantHandler}>Remove</Button>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveParticipantDialog;
