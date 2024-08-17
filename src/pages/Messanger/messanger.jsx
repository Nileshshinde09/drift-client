import React, { useEffect, useState } from 'react';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { VenetianMask, Users2, SquareUserIcon } from 'lucide-react';
import { GroupChat } from '@/services';
import { CardLayout } from '@/components';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCreateChat, useInitializeGroupChat, useProfileImage } from '@/hooks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Messenger = () => {
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const [profileImageUrl, setImageId, isLoadingProfileImage, profileImageError] = useProfileImage();
    const [publicGroups, setPublicGroups] = useState([]);
    const [privateGroups, setPrivateGroups] = useState([]);
    const [personal, setPersonal] = useState([]);
    const [setRecieverId, Error] = useCreateChat();
    const [setRecieverGroupId] = useInitializeGroupChat();
    
    useEffect(() => {
        const fetchChats = async () => {
            const response = await GroupChat.getAllChat();
            if (response.data.data) {
                const publicGroupsSet = new Set();
                const privateGroupsSet = new Set();
                const personalSet = new Set();

                response.data.data.forEach((chat) => {
                    if (chat.isGroupChat && !chat.isAnoGroupChat) {
                        publicGroupsSet.add(chat);
                    } else if (chat.isGroupChat && chat.isAnoGroupChat) {
                        privateGroupsSet.add(chat);
                    } else {
                        personalSet.add(chat);
                    }
                });

                setPublicGroups([...publicGroupsSet]);
                setPrivateGroups([...privateGroupsSet]);
                setPersonal([...personalSet]);
            }
        };

        fetchChats();
    }, []);

    const handleOneOnOneChat = async (chat) => {
        const participant = chat.participants.find((ind) => ind?._id !== userData?._id);
        setRecieverId(participant._id);
        navigate(`/messanger/chat/${participant._id}`);
    }

    const handleGroupChat = async (chat) => {
        setRecieverGroupId(chat?._id);
        navigate(`/messanger/group-chat/${chat?._id}/false`);
    }

    return (
        <Tabs defaultValue="personal" className="w-1/2 mx-auto">
            <TabsList className="grid w-full grid-cols-3 space-x-2">
                <TabsTrigger value="personal"><SquareUserIcon className='mx-1' />Personal</TabsTrigger>
                <TabsTrigger value="publicGroup"><Users2 className='mx-1' />PublicGroups</TabsTrigger>
                {/* <TabsTrigger value="anoGroup"><VenetianMask className='mx-1' />AnoGroups</TabsTrigger> */}
            </TabsList>
            <TabsContent value="personal">
                <div className='h-screen w-full px-2'>
                    <div className='flex flex-wrap space-x-3 p-4 mx-auto w-full h-1/2 bg-black rounded-2xl border-spacing-1 border-2 border-gray-400'>
                        {
                            personal.map((chat) => {
                                if(chat.name !== "One on one chat") return null;
                                
                                return (
                                    <div key={chat._id} onClick={() => handleOneOnOneChat(chat)}>
                                        <CardLayout className={""}>
                                            <div className="flex items-center">
                                                <Avatar className="w-16 h-fit -ml-3">
                                                    <AvatarImage src={profileImageUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <small className="text-sm font-medium leading-none">{chat.participants.find((ind) => ind?._id !== userData?._id)?.username}</small>
                                        </CardLayout>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="publicGroup">
                <div className='h-screen w-full px-2'>
                    <div className='flex flex-wrap overflow-y-scroll no-scrollbar space-x-5 space-y-5 p-4 mx-auto w-full h-1/2 bg-black rounded-2xl border-spacing-1 border-2 border-gray-400'>
                        <div/>
                        {
                            publicGroups.map((chat) => (
                                <div key={chat._id}>
                                    <CardLayout className={"cursor-pointer"}>
                                        <div className="flex items-center w-full" onClick={() => handleGroupChat(chat)}>
                                            <Avatar className="w-16 h-fit -ml-3">
                                                <AvatarImage src={"https://github.com/shadcn.png"} alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <small className="text-sm font-medium leading-none">{chat.name}</small>
                                    </CardLayout>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </TabsContent>
            <TabsContent value="anoGroup">
                <div className='h-screen w-full px-2'>
                    <div className='p-4 mx-auto w-full space-x-5 space-y-5 h-1/2 bg-black rounded-2xl border-spacing-1 border-2 border-gray-400'>
                        {
                            privateGroups.map((chat) => (
                                <div key={chat._id}>{chat.name}</div>
                            ))
                        }
                    </div>
                </div>
            </TabsContent>
        </Tabs>
    );
}

export default Messenger;
