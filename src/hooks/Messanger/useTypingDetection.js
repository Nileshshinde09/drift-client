import { startTyping, stopTyping } from '@/app/slices/messangerSlice';
import { ChatEventEnum } from '@/constants';
import { ChatEvent } from '@/services';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useTypingDetection = () => {
    const dispatch = useDispatch();
    const [isTyping, setIsTyping] = useState(false);
    const isKeyDown = useRef(false);
    const socket = useSelector(state => state.socket.socket);
    const ChatRoomData = useSelector(state => state.messanger.currentChatRoomData);
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {
        if (!ChatRoomData?.data) return;
        const handleKeyDown = async (event) => {
            if (!isKeyDown.current && event.key !== "Meta") {
                setIsTyping(true);
                isKeyDown.current = true;
                await ChatEvent.TypingStartEvent(ChatRoomData.data._id)
            }
        };
        const handleKeyUp = async () => {
            setIsTyping(false);
            isKeyDown.current = false;
            setTimeout(async()=>{
                await ChatEvent.TypingStopEvent(ChatRoomData.data._id)
            },1000)
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [ChatRoomData, socket, userData, dispatch]);

    useEffect(() => {
        if (socket) {
            const handleTyping = (data) => {
                dispatch(startTyping(data));    
            };

            const handleStopTyping = () => {
                dispatch(stopTyping());
            };

            socket.on(ChatEventEnum.TYPING_EVENT, handleTyping);
            socket.on(ChatEventEnum.STOP_TYPING_EVENT, handleStopTyping);

            return () => {
                socket.off(ChatEventEnum.TYPING_EVENT, handleTyping);
                socket.off(ChatEventEnum.STOP_TYPING_EVENT, handleStopTyping);
            };
        }
    }, [socket, dispatch]);

    return [isTyping];
};

export default useTypingDetection;
