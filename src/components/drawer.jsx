import ThemeButton from "./themeButton"
import { Button } from "@/components/ui/button"
import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import React from 'react'
import {Logout,ChangePassword} from "@/components"
const SettingDrawer = () => {
  return (
    <>
     <DrawerContent>
       <div className="mx-auto w-full max-w-sm text-center h-screen">
         <DrawerHeader>
           <DrawerTitle className="text-center">Settings</DrawerTitle>
         </DrawerHeader>
         <div className=" flex ">
         <ThemeButton/>
         </div>
         <div className="flex">
         <Logout/>
         </div>
         <div className="flex">
         <ChangePassword/>
         </div>
         <DrawerFooter>
           <DrawerClose >
             <Button variant="outline">Cancel</Button>
           </DrawerClose>
         </DrawerFooter>
       </div>
     </DrawerContent>
          </>
  )
}

export default SettingDrawer
