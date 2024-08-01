import { Button } from "@/components/ui/button"
import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    Drawer,
    DrawerTrigger
} from "@/components/ui/drawer"

import { MESSANGER_THEME_ENUM, MESSANGER_THEME_VALUES } from "@/constants"
import React, { useState } from 'react'
import { CardLayout, ThemeDialog } from "."

const MessangerThemeDrawer = ({ children }) => {

    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    {children}
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full  text-center h-screen overflow-y-scroll">
                        <DrawerHeader>
                            <DrawerTitle className="text-center">Select Messanger Theme</DrawerTitle>
                        </DrawerHeader>
                        <CardLayout className={"hover:scale-100"}>
                            {
                                MESSANGER_THEME_VALUES.map((values) => {
                                    return (
                                        <div className="flex flex-wrap mb-3">
                                            {
                                                values.map((colorValue) => {
                                                    return (
                                                        <ThemeDialog color={colorValue}>
                                                            <div className={`h-14 w-20 m-2 border-2 border-black rounded-lg ${colorValue} shadow-2xl hover:scale-110 transition-transform text-center flex items-center justify-center ${colorValue.replace('bg', 'shadow')}`} >{colorValue.split('-')[1]}</div>
                                                        </ThemeDialog>
                                                    )   
                                                })

                                            }
                                        </div>

                                    )
                                })
                            }
                        </CardLayout>
                        <DrawerFooter>
                            <DrawerClose >
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MessangerThemeDrawer
