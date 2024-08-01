import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GroupDialog, SpaceMessage } from '.'
import { setMessangerTheme } from '@/app/slices/themeSlice';
import anoGroupLogo from "@/assets/Applogo/driftLogo.png"
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { useDocumentTitle } from 'usehooks-ts';
const ShowSpaceMessages = () => {
    const [isAno, setIsAno] = useState(false)
    const [online, setOnline] = useState(false);
    const [groupName, setGroupName] = useState(null)
    const [isAdmin,setIsAdmin]=useState(false)
    useDocumentTitle(`${groupName || "Group"}#Messanger💎Drift`)
    const isTyping = useSelector((state) => state.messanger.isTyping);
    const messages = useSelector((state) => state.messanger.messageList);
    const userId = useSelector((state) => state.auth.userData);
    const typingEntityName = useSelector(state => state.messanger.TypingEntityName)
    const chatData = useSelector(state => state.messanger.currentChatRoomData)
    const dispatch = useDispatch()
    const messageList = useMemo(() => {
        return messages?.length > 0 ? [...messages].reverse() : [];
    }, [messages]);
    useEffect(() => {
        if (!chatData || !userId) return;
        setGroupName(chatData.name)
        setIsAdmin(chatData.admin===userId._id)
    }, [chatData,userId])
    return (
        <div className='absolute top-0 text-center bg-black w-full h-full'>
            <div className={`bg-white space-x-3 flex items-center relative mt-20 h-14 sm:w-1/2 w-full sm:mt-2 rounded-md mx-auto`}>
                <img
                    src={anoGroupLogo}
                    width={50}
                    height={50}
                    alt="Avatar"
                    className="animate-accordion-up transition-transform overflow-hidden bg-transparent m-2 bg-black rounded-full"
                />
                <p className="leading-9 text-black font-semibold my-5">{groupName || ""}</p>
                <div className={`transition w-3 h-3 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {isTyping && (
                    <>
                        <h1 className="leading-9 text-black font-semibold my-5 transition flex">
                            {typingEntityName}
                        </h1>
                    </>
                )}
                <GroupDialog>
                    <Button variant="ghost">
                        <Menu className='z-50 cursor-pointer absolute right-5 hover:scale-110 transition-transform' stroke='black' />
                    </Button>
                </GroupDialog>
            </div>

            <div className={`relative h-[33rem] bg-black shadow-2xl border-2 border-orange-100 rounded-3xl sm:w-1/2 w-full mx-auto mt-5 no-scrollbar px-3 py-10 space-y-2 overflow-y-scroll`}>
                {messageList.length ? messageList.map((message) => (
                    <SpaceMessage
                        isAdmin={isAdmin}
                        messageData={message}
                        key={message._id}
                        type={message.sender._id === userId?._id ? 'y' : ''}
                        payload={message.content}
                    />
                )) :
                    <h1 className="scroll-m-20 opacity-50 text-black text-4xl font-extrabold tracking-tight lg:text-5xl">
                        No Chats!
                    </h1>
                }
            </div>
        </div>
    );
};

export default ShowSpaceMessages;
