import React from 'react'
import { MessangerContextMenue,MessangerContextMenueYourself } from '.'
import { timeSince } from '@/utils';
import { useSelector } from 'react-redux';
const Message = ({ payload, type = 'r', messageData }) => {
    const username = useSelector((state) => state.auth.userData?.username)
    return (
        <>
            {type === 'y' ?
                <>
                    <div className='w-full flex justify-end transition-transform'>
                        <div>
                            <p className="text-sm text-black">{messageData.sender?.username === username ? "you" : messageData.sender?.username}</p>
                            <p className="text-sm text-black">{timeSince(messageData.createdAt)}</p>
                        </div>
                        <MessangerContextMenueYourself messageData={messageData}>
                            <div className='py-3 px-4 rounded-3xl bg-gray-100 text-black'>
                                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                                    {
                                        payload
                                    }
                                </h4>
                            </div>
                        </MessangerContextMenueYourself>

                    </div>
                </> :
                <>
                    <div className='w-full flex justify-start transition-transform'>
                        <MessangerContextMenue messageData={messageData}>
                            <div className='py-3 px-4 rounded-3xl bg-white text-black'>
                                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                                    {
                                        payload
                                    }
                                </h4>
                            </div>
                        </MessangerContextMenue>
                        <div>
                            <p className="text-sm text-black">{messageData.sender?.username}</p>
                            <p className="text-sm text-black">{timeSince(messageData.createdAt)}</p>
                        </div>
                    </div>
                </>

            }
        </>
    )
}

export default Message
