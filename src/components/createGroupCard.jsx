import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ANO_GROP_TOPICS } from "@/constants"
import { CardLayout, FriendListDrawer, ParticipantsContextMenue, SelectGroupTopic } from "."
import { useEffect, useState } from "react"
import { Plus, UserPlus2 } from "lucide-react"
import { useSelector } from "react-redux"
import { GroupChat as GroupChatService } from "@/services"
import { useToast } from "./ui/use-toast"
import {toast as sonnerToast} from "sonner"
import { useNavigate } from "react-router-dom"
import { useDocumentTitle } from "usehooks-ts"
const CreateGroupForm = () => {
  useDocumentTitle("Creating new group💎Drift")
  const navigate = useNavigate()
  const [participantsList, setParticipantsList] = useState([])
  const [groupName, setGroupName] = useState(null)
  const [topicName, setTopicName] = useState(null)
  const [isAno, setIsAno] = useState(false)
  const { toast } = useToast()
  const friendsList = useSelector((state) => state.messanger.participantsList)
  useEffect(() => {
    setParticipantsList(friendsList)
  }, [friendsList])
  const handleSubmit = async () => {
    try {
      if(!groupName || !topicName || !participantsList.length ) return  toast({
        title: "Error",
        description: "All fields are required to create group.",
        variant: "destructive"
      })

      const participants=friendsList.map((frnd)=>frnd._id)
      console.log(participants);
      const response = await GroupChatService.createAGroupChat({ name:groupName, participants,isAnoGroupChat:isAno,topic:topicName })
      if(response.data.data) return sonnerToast("Group has been created", {
        description: "group created sucessfully!",
        action: {
          label: "Open",
          onClick: () =>navigate(`/messanger/group-chat/${response.data.data._id}/${false}`) ,
        },
      })
    } catch (error) {
      console.log(error.message || "Something went wrong while creating group");
    }

  }
  return (
    <Card className="w-1/2 mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Create Groups with Friends</CardTitle>
        <CardDescription>Select appropriate information to create group.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" onChange={(e) => setGroupName(e.target.value)} placeholder="Name of your Group" />
            </div>
            {/* <div className="flex items-center space-x-2">
              <Label htmlFor="isAno">Is Ano Group</Label>
              <Switch id="isAno" onClick={(e) => setIsAno(e.target.ariaChecked)} value={isAno} />
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Topic</Label>
              <SelectGroupTopic setTopic={setTopicName} selectedTopic={topicName} />
            </div>
            {participantsList.length ? <CardLayout className={"flex flex-wrap -space-x-7 px-10 transition-transform hover:space-x-1"}>
              {
                participantsList.map((participant) => (
                  <>
                    <div className="-skew-y-6 hover:-skew-y-0">
                      <ParticipantsContextMenue participantData={participant}>
                        <Avatar className="mx-2">
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>{participant?.username}</AvatarFallback>
                        </Avatar>
                      </ParticipantsContextMenue>
                      <div className="">
                        {
                          participant?.username
                        }
                      </div>
                    </div>
                  </>
                ))
              }
              <div className="-skew-y-6 hover:-skew-y-0">
                <FriendListDrawer><Avatar className="mx-2">
                  <AvatarImage src="" alt="@shadcn" />
                  <AvatarFallback><Plus /></AvatarFallback>
                </Avatar></FriendListDrawer>
                <div className="">
                  Add
                </div>
              </div>
            </CardLayout> :
              <>
                <div className="mx-auto">
                  <div className="w-14 h-14 mx-auto cursor-pointer hover:bg-indigo-300 bg-slate-300 rounded-full flex items-center justify-center hover:rotate-45 transition hover:scale-110">
                    <FriendListDrawer><UserPlus2 stroke="black" className="scale-150" /></FriendListDrawer>
                  </div>
                  <p className="leading-7 [&:not(:first-child)]:mt-1">
                    Add Participants
                  </p>
                </div>
              </>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </CardFooter>
    </Card>
  )
}
export default CreateGroupForm




// avatar
// createdAt
// fullName
// username
// _id
