import { Button } from "@/components/ui/button"
import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import React, { useState } from 'react'
import { AnoAvatarsCollection, UploadAvatar } from "."
const avatarDrawer = () => {

    return (
        <>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm text-center h-screen overflow-y-scroll">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Avatar</DrawerTitle>
                    </DrawerHeader>
                    <AnoAvatarsCollection />
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        Or
                    </h3>
                    <UploadAvatar />
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

export default avatarDrawer
