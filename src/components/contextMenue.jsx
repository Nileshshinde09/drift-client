import { deleteMessage, removeGroupParticipant } from "@/app/slices/messangerSlice"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useCreateChat } from "@/hooks"
import { Messages } from "@/services"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const MessangerContextMenue = ({ children, messageData }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userData = useSelector(state => state.auth.userData)
  const [setRecieverId, Error] = useCreateChat();
  const handlePersonalChat = () => {
    setRecieverId(messageData.sender._id)
    navigate(`/messanger/chat/${messageData.sender._id}`)
  }
  const deleteMessageHandler = async () => {
    try {
      const response = await Messages.deleteMessage(messageData.chat, messageData._id)
      if (response.data.success) {
        dispatch(deleteMessage(response.data.data))
        setMessageReloade(!messageReloade)
      }
    } catch (error) {
      console.log(error.message || "Something went wrong while deleting message.");
    }
  }
  
  return (
    <ContextMenu>
      <ContextMenuTrigger className=" flex h-fit w-fit items-center justify-center rounded-md text-sm">
        {
          children
        } 
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={deleteMessageHandler}>
          Delete
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          Edit
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem inset>
          info
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>
        {userData._id !== messageData.sender._id && <ContextMenuItem inset onClick={handlePersonalChat}>
          Message Personally
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>}
      </ContextMenuContent>
    </ContextMenu>
  )
}

const ParticipantsContextMenue = ({ children, participantData }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState(null)
  useEffect(() => {
    if (!data) return;
    dispatch(removeGroupParticipant(data))

  }, [data])
  return (
    <ContextMenu>
      <ContextMenuTrigger className=" flex h-fit w-fit items-center justify-center rounded-md border border-dashed text-sm">
        {
          children
        }
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem inset onClick={() => setData(participantData)}>
          Remove
          <ContextMenuShortcut></ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
export { MessangerContextMenue, ParticipantsContextMenue };