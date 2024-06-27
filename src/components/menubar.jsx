import {
  Menubar,
  MenubarMenu,

} from "@/components/ui/menubar"
import { useStopwatch } from 'react-timer-hook';
import { PhoneOff, Phone, MicOff, Mic, VideoOff, Video } from "lucide-react"
import { useEffect, useState } from "react";
const MainMenubar = () => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
  } = useStopwatch({ autoStart: false });
  const [isCallOn, setIsCallOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  useEffect(()=>{
    
  },[])

  return (
    <Menubar>
      <MenubarMenu>
        <div className="hover:scale-110 cursor-pointer px-5" onClick={() => start()}>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-green-400">
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </h4>
        </div>
      </MenubarMenu>
      <MenubarMenu>
        <IconSetter setState={setIsMicOn} state={isMicOn}>
          {isMicOn ? <MicOff /> : <Mic />}
        </IconSetter>
      </MenubarMenu>
      <MenubarMenu>
        <IconSetter setState={setIsCallOn} state={isCallOn}>
          <Phone />
        </IconSetter>
      </MenubarMenu>
      <MenubarMenu>
        <IconSetter setState={setIsVideoOn} state={isVideoOn}>
          {isVideoOn ? <VideoOff /> : <Video />}
        </IconSetter>
      </MenubarMenu>
    </Menubar>
  )
}
const IconSetter = ({ children, setState, state }) => {
  return (
    <>

      <div onClick={() => setState(!state)} className={`${state ? 'text-red-600' : 'text-green-600'}  hover:scale-110 cursor-pointer px-5`}>
        {
          children
        }
      </div>
    </>
  )
}
export default MainMenubar