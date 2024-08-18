import ThemeButton from "./themeButton"
import { Button } from "@/components/ui/button"
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import React, { useEffect, useState } from 'react'
import { Logout, ChangePassword, Share, UserProfileDropdown, ChangePasswordLogoutDialog } from "@/components"
import { CircleUser, Copyright,UserRoundCog, HandshakeIcon, Headset, Share2, UserSearch } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FcAbout } from "react-icons/fc";
import { Switch } from "./ui/switch"
import { setIsMuteNotifications } from "@/app/slices/themeSlice"
import { toast } from "sonner"
const SettingDrawer = () => {
  const [isMute, setIsMute] = useState("true" === useSelector(state => state.theme.isNotificationsMuted))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.userData)
  useEffect(() => {
    if (isMute) {
      toast("Notifications has been muted", {
        // description:<div className="text-center flex space-x-7"><BellOffIcon className="mx-auto animate-ping"/></div>,
        action: {
          label: "Unmute",
          onClick: () => { dispatch(setIsMuteNotifications('false')) },
        },
        duration: 60 * 1000,
        closeButton: true
      });
    } else {
      // toast("Notifications has been Unmuted", {
      //   // description:<div className="text-center flex space-x-7"><BellRingIcon className="mx-auto animate-ping"/></div>,
      //   action: {
      //     label: "Mute",
      //     onClick: () => { dispatch(setIsMuteNotifications('true')) },
      //   },
      //   duration: 60 * 1000,
      //   closeButton: true
      // });
    }
  }, [isMute, dispatch])
  return (
    <>
      <DrawerContent>
        <div className="max-sm:mx-4 mx-auto max-w-2xl text-center overflow-y-scroll h-screen no-scrollbar">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Settings
              </h2>
            </DrawerTitle>
          </DrawerHeader>
          <div className="">
            <p className="border-b pb-2 leading-7 [&:not(:first-child)]:mt-6">
              The app settings and some features
            </p>
            <h3 className="text-left border-b pb-2 flex mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              <CircleUser className="scale-150 mx-4" />
              <Button onClick={() => navigate(`/profile/@${user?.username}`)} variant="outline" className="w-1/3 mx-3"><UserSearch /></Button>
            </h3>
            <h3 className="text-left border-b pb-2 flex mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Share Profile
              <Share>
                <Button variant="outline" className="w-1/3 mx-3"><Share2 /></Button>
              </Share>
            </h3>
            <h3 className="text-left border-b pb-2 flex mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Update Profile
                <Button onClick={()=>navigate("/update-profile")} variant="outline" className="w-1/3 mx-3"><UserRoundCog /></Button>
            </h3>

            <h3 className="mt-8 text-left scroll-m-20 text-2xl font-semibold tracking-tight">
              Theme of App
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              This contains three types of theme light,dark and another is system which is your device theme
            </p>
            <div className="w-full m-2 border-b pb-2">
              <ThemeButton className="w-fit mx-auto" />
            </div>

            <h3 className="mt-8 text-left scroll-m-20 text-2xl font-semibold tracking-tight">
              Notifications
            </h3>
            <Button variant="outline" className="w-1/3" onClick={() => navigate("/music-library")}>Set Notifications Sound</Button>
            <div className="w-full m-2 flex items-center ">
              <Switch className="mx-2"
                value={isMute}
                onClick={(e) => {
                  setIsMute(e.target.ariaChecked === 'true')
                  dispatch(setIsMuteNotifications(e.target.ariaChecked))
                }} />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {isMute ? `Mute Notifications` : `UnMute Notifications`}
              </h4>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6 border-b pb-2">
              This contains three types of theme light,dark and another is system which is your device theme
            </p>

            <h3 className="text-left mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
              Security
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="leading-7 [&:not(:first-child)]:mt-2">
                    This action make you logout from this device.
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-full m-2">
                    <Logout className="w-1/2 bg-red-600 hover:scale-105 transition-transform dark:text-black mx-auto" />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Change Password of your account</AccordionTrigger>
                <AccordionContent>
                  <div className="w-full m-2">
                    <ChangePassword className="w-1/2 dark:bg-white dark:text-black hover:scale-105 transition-transform mx-auto" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>


            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h3 className="mt-8 text-left scroll-m-20 text-2xl font-semibold tracking-tight">
                    Support
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    To contact support fill the content in provided fields.
                  </p>
                  <div className="w-full m-2 ">
                    <div onClick={() => navigate(`/@DriftSocial/support`)} className="bg-sky-200 mx-auto h-14 w-14 rounded-full hover:scale-105 transition-transform cursor-pointer flex justify-center items-center">
                      <Headset className="w-fit mx-auto scale-150 m-5" stroke="black" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h3 className="mt-8 text-left scroll-m-20 text-2xl font-semibold tracking-tight">
                    Terms and Conditions
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Terms and conditions are needs to be followed.
                  </p>
                  <div className="w-full m-2 ">
                    <div onClick={() => navigate(`/@DriftSocial/terms-n-conditions`)} className="bg-sky-200 mx-auto h-14 w-14 rounded-full hover:scale-105 transition-transform cursor-pointer flex justify-center items-center">
                      <HandshakeIcon className="w-fit mx-auto scale-150 m-5" stroke="black" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h3 className="mt-8 text-left scroll-m-20 text-2xl font-semibold tracking-tight">
                    Copyright
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Copyright for drift social to prevent content.
                  </p>
                  <div className="w-full m-2 ">
                    <div onClick={() => navigate(`/@DriftSocial/copyright`)} className="bg-indigo-200 mx-auto h-14 w-14 rounded-full hover:scale-105 transition-transform cursor-pointer flex justify-center items-center">
                      <Copyright className="w-fit mx-auto scale-150 m-5" stroke="black" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h3 className="mt-8 text-left scroll-m-20 text-2xl font-semibold tracking-tight">
                    About
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    About the devlopers and team.
                  </p>
                  <div className="w-full m-2 ">
                    <div onClick={() => navigate(`/@DriftSocial/copyright`)} className="bg-indigo-200 mx-auto h-14 w-14 rounded-full hover:scale-105 transition-transform cursor-pointer flex justify-center items-center">
                      <FcAbout className="w-fit mx-auto scale-150 m-5" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </>
  )
}

export default SettingDrawer
