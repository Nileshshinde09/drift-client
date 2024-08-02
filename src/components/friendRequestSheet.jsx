import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from './ui/separator'
import { Friends } from '@/services'
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
import { timeSince } from '@/utils'
import { useSelector } from 'react-redux'
import { useToast } from './ui/use-toast'
const FriendRequestSheet = ({ children }) => {
    const {toast}=useToast()
    const user = useSelector((state) => state.auth.userData)
    const [FriendRequestList, setFriendRequestList] = useState([]);
    const [reloader, setReloader] = useState(false)
    const handleAcceptFriendRequest = async (remoteUser) => {
        try {
            const response = await Friends.respondToInvitations({isAccepted:true,invitationId:remoteUser.requestId})
            if (response.data) {
                setReloader(!reloader)
                toast({
                    title:"Friend request accepted succefully!"
                })
            } 
        } catch (error) {
            console.error("Failed to responsed the friend request :", error.message);
        }
    }
    const handleRejectFriendRequest = async (remoteUser) => {
        try {
            const response = await Friends.respondToInvitations({isAccepted:false,invitationId:remoteUser.requestId})
            if (response.data) {
                setReloader(!reloader)
                toast({
                    title:"Friend request rejected succefully!"
                })
            } 
        } catch (error) {
            console.error("Failed to responsed the friend request :", error.message);
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const friends = await Friends.getRequestsAndInvitations()
                if (friends?.data) {
                    setFriendRequestList(friends?.data?.data?.requests);
                } else {
                    console.error("Expected an array but received:", friends);
                }
            } catch (error) {
                console.error("Failed to fetch friends:", error.message);
            }
        })();
    }, [reloader]);
    return (
        <Sheet key="top">
            <SheetTrigger asChild>
                <Button variant="ghost">
                    {
                        children
                    }
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Friend Requests</SheetTitle>
                    <SheetDescription>
                        Friend requests are came from your followers.
                    </SheetDescription>
                </SheetHeader>
                <Separator className="w-full my-2" />
                <div className="grid gap-4 py-4">
                    {FriendRequestList.length > 0 ? (
                        FriendRequestList.map((frnd, index) => {
                            if (frnd._id === user._id) return;
                            return (
                                <div key={index} className="flex justify-start items-center m-2 w-full mx-auto">
                                    <Avatar className="mx-2">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>{frnd?.username}</AvatarFallback>
                                    </Avatar>

                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-center">
                                                <p className="text-center leading-7 [&:not(:first-child)]:mt-6 ">
                                                    {
                                                        frnd?.username
                                                    }
                                                </p>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {
                                                    <>
                                                        <p className="leading-7 [&:not(:first-child)]:mt-6 ">
                                                            {
                                                                frnd?.fullName
                                                            }
                                                        </p>
                                                        <p className="leading-7 [&:not(:first-child)]:mt-1 ">
                                                            {
                                                                "request made " + timeSince(frnd?.createdAt.split("T")[0])
                                                            }
                                                        </p>
                                                        <div className='flex justify-start space-x-2'>
                                                            <Button onClick={()=>handleAcceptFriendRequest(frnd)} variant="outline" className="outline-green-800">Accept</Button>
                                                            <Button onClick={()=>handleRejectFriendRequest(frnd)} variant="outline" className="outline-red-800">Reject</Button>
                                                        </div>
                                                    </>
                                                }
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            )
                        })
                    ) : (
                        <div className="py-2">
                            No friends found.
                        </div>
                    )}
                </div>
                <SheetFooter>
                    {/* <SheetClose asChild>
                        hi
                    </SheetClose> */}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default FriendRequestSheet
