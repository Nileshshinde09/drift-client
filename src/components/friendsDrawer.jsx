import { Button } from "@/components/ui/button";
import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    Drawer,
    DrawerTrigger
} from "@/components/ui/drawer";
import React, { useEffect, useState } from 'react';
import { Friends } from "@/services";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { timeSince } from "@/utils";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { addGroupParticipants, removeGroupParticipant } from "@/app/slices/messangerSlice"
import { useDispatch } from "react-redux";

const FriendListDrawer = ({ children }) => {
    const dispatch = useDispatch()
    const [FriendList, setFriendList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const friends = await Friends.getAllFriends();
                if (friends?.data?.data) {
                    setFriendList(friends.data.data);
                } else {
                    console.error("Expected an array but received:", friends);
                }
            } catch (error) {
                console.error("Failed to fetch friends:", error.message);
            }
        })();
    }, []);
    return (
        <Drawer>
            <DrawerTrigger>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <ContextMenu>
                    <ContextMenuTrigger className="">
                        <div className="mx-auto w-full max-w-sm text-center h-screen">
                            <DrawerHeader>
                                <DrawerTitle className="text-center">
                                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                        Friends
                                    </h2>
                                </DrawerTitle>
                            </DrawerHeader>
                            {FriendList.length > 0 ? (
                                FriendList.map((frnd, index) => (
                                    <div onClick={()=>dispatch(addGroupParticipants(frnd?.friend[0]))} key={index} className="flex justify-start items-center m-2 w-full mx-auto">
                                        <Avatar className="mx-2">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>{frnd?.friend[0]?.username}</AvatarFallback>
                                        </Avatar>

                                        <Accordion type="single" collapsible className="w-full">
                                            <AccordionItem value="item-1">
                                                <AccordionTrigger className="text-center">
                                                    <p className="text-center leading-7 [&:not(:first-child)]:mt-6 ">
                                                        {
                                                            frnd?.friend[0]?.username
                                                        }
                                                    </p>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {
                                                        <>
                                                            <p className="leading-7 [&:not(:first-child)]:mt-6 ">
                                                                {
                                                                    frnd?.friend[0]?.fullName
                                                                }
                                                            </p>
                                                            <p className="leading-7 [&:not(:first-child)]:mt-1 ">
                                                                {
                                                                    "you are friends since " + timeSince(frnd?.createdAt.split("T")[0])
                                                                }
                                                            </p>
                                                        </>
                                                    }
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    </div>
                                ))
                            ) : (
                                <div className="py-2">
                                    No friends found.
                                </div>
                            )}
                            <DrawerFooter>
                                <DrawerClose>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-64">
                        <ContextMenuRadioGroup value="pedro">
                            <ContextMenuLabel inset>Remove from friend list</ContextMenuLabel>
                            <ContextMenuSeparator />
                            <Button onClick={() => { console.log("hello") }} className="">Remove</Button>
                        </ContextMenuRadioGroup>
                    </ContextMenuContent>
                </ContextMenu>
            </DrawerContent>
        </Drawer>
    );
}

export default FriendListDrawer;
