import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UsersRoundIcon,UserX2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { RemoveParticipantDialog } from ".";
const GroupParticipantSheet = ({showParticipants=true}) => {
    const [removeParticipants, setRemoveParticipants] = useState(!showParticipants)
    const [participants, setParticipants] = useState([]);
    const participant = useSelector(state => state.messanger.currentChatRoomData.participants);
    const chatData = useSelector(state => state.messanger.currentChatRoomData);
    useEffect(() => { 
        if (participant && participant) {
            setParticipants(participant);
        }
    }, [participant]);

    return (
        <div className="grid grid-cols-2 gap-2">
            <Sheet key={"top"}>
                <SheetTrigger asChild>
                    <Button className="w-fit">
                        {showParticipants?<>Participants<UsersRoundIcon className="mx-2" /></>:<>Remove Participants<UserX2Icon className="mx-2" /></>}
                    </Button>
                </SheetTrigger>
                <SheetContent side={"top"}>
                    <div className="my-10 flex justify-start items-center m-2 w-full mx-auto space-x-4">
                        <div/>
                        {!removeParticipants?
                            participantShowList(participants,chatData)
                            :
                            participantRemoveList(participants,chatData)
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default GroupParticipantSheet;


const participantShowList=(participants,chatData)=>{
    return (
        participants?.map((frnd, index) =>(
            <div key={index} className="w-fit flex">
                    <Avatar className="mx-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>{frnd?.username}</AvatarFallback>
                    </Avatar>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-center">
                                <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
                                    {
                                        chatData.admin===frnd._id?`${frnd?.username} @Admin`:frnd?.username
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
                                                "Friends since " + timeSince(frnd?.createdAt.split("T")[0])
                                            }
                                        </p>
                                    </>
                                }
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
        ))
    )
}


const participantRemoveList=(participants,chatData)=>{
    return (
        participants.map((frnd, index) =>{
            if(chatData.admin===frnd._id) return
            return(
            <RemoveParticipantDialog participant={frnd} groupName={chatData}>
            <div key={index} className="w-fit flex">
                    <Avatar className="mx-2">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>{frnd?.username}</AvatarFallback>
                    </Avatar>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-center">
                                <p className="text-center leading-7 [&:not(:first-child)]:mt-6">
                                    {
                                        chatData.admin===frnd._id?`${frnd?.username} @Admin`:frnd?.username
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
                                                "Friends since " + timeSince(frnd?.createdAt.split("T")[0])
                                            }
                                        </p>
                                    </>
                                }
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                </RemoveParticipantDialog>)
        })
    )
}