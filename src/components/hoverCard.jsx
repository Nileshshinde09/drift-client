import { CalendarDays } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useProfileImage } from "@/hooks"
import { useEffect } from "react"
const hoverCard=({creator})=>{
  const [url, setId,isLoading,profileError] = useProfileImage()
  useEffect(()=>{
    if(creator?.Avatar){
      setId(creator?.Avatar)
    }
  },[creator])

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{`@${creator?.username||"username"}`}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage src={url||"https://github.com/vercel.png"} />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{`@${creator?.username||"username"}`}</h4>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Updated { "🤔🤔🤔"}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
export default hoverCard