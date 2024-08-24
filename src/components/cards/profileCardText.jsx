import React from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Link } from 'react-router-dom'
import { CallDialog, ChatDialog, FriendListDrawer } from '..'
import { useDispatch, useSelector } from 'react-redux';
const profileCardText = ({ onButtonClick, route, className,profileData, props, value = "", altValue = "", children, cardType = "text", _id }) => {

    if (cardType === "button")
        return (
            <div onClick={onButtonClick} className={`flex-1 space-y-3`} {...props}>
                <Button className={`w-full flex space-x-2 ${className}`}>
                    <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                        <span>{children}</span>
                    </h4>
                    <Separator orientation="vertical" />
                    <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                        <span>{value || altValue}</span>
                    </h4>
                </Button>
                <Separator className="my-2 w-full" />
            </div>
        )
    else if (cardType === "create-public-group")
        return (
            <div onClick={onButtonClick} className={`flex-1 space-y-3`} {...props}>
                <Button className={`w-full flex space-x-2 ${className}`}>
                    <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                        <span>{children}</span>
                    </h4>
                    <Separator orientation="vertical" />
                    <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                        <span>{value || altValue}</span>
                    </h4>
                </Button>
                <Separator className="my-2 w-full" />
            </div>
        )
    else if (cardType === "voice-call-button") {
        return (
            <div onClick={onButtonClick} className={`flex-1 space-y-3`} {...props}>
                <CallDialog callType='v'>
                    <Button className={`w-full flex space-x-2 ${className}`}>
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{children}</span>
                        </h4>
                        <Separator orientation="vertical" />
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{value || altValue}</span>
                        </h4>
                    </Button>
                </CallDialog>
                <Separator className="my-2 w-full" />
            </div>
        )
    }

    else if (cardType === "video-call-button") {

        return (
            <div onClick={onButtonClick} className={`flex-1 space-y-3`} {...props}>
                <CallDialog callType='av'>
                    <Button className={`w-full flex space-x-2 ${className}`}>
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{children}</span>
                        </h4>
                        <Separator orientation="vertical" />
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{value || altValue}</span>
                        </h4>
                    </Button>
                </CallDialog>
                <Separator className="my-2 w-full" />
            </div>
        )
    }
    else if (cardType === "chat-with-friend") {

        return (
            <div onClick={onButtonClick} className={`flex-1 space-y-3`} {...props}>
                <ChatDialog friend={profileData}>
                    <Button className={`w-full flex space-x-2 ${className}`}>
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{children}</span>
                        </h4>
                        <Separator orientation="vertical" />
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{value || altValue}</span>
                        </h4>
                    </Button>
                </ChatDialog>
                <Separator className="my-2 w-full" />
            </div>
        )
    }
    else if (cardType === "friendList") {
        return (
            <div className={`flex-1 space-y-3`} {...props}>
                <FriendListDrawer>
                    <Button className={`w-full flex space-x-2 ${className}`}>
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{children}</span>
                        </h4>
                        <Separator orientation="vertical" />
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{value || altValue}</span>
                        </h4>
                    </Button>
                </FriendListDrawer>
                <Separator className="my-2 w-full" />
            </div>
        )
    }

    else if (cardType === "group-chat-with-friends") {

        return (
            <div onClick={onButtonClick} className={`flex-1 space-y-3`} {...props}>
                <ChatDialog >
                    <Button className={`w-full flex space-x-2 ${className}`}>
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{children}</span>
                        </h4>
                        <Separator orientation="vertical" />
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{value || altValue}</span>
                        </h4>
                    </Button>
                </ChatDialog>
                <Separator className="my-2 w-full" />
            </div>
        )
    }
    else if (cardType === "link") {
        return (
            <div className={`flex-1 space-y-3`} {...props}>
                <Link to={route}>
                    <Button className={`w-full flex space-x-2 ${className}`}>
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{children}</span>
                        </h4>
                        <Separator orientation="vertical" />
                        <h4 className="scroll-m-20 space-x-2 text-xl flex font-semibold tracking-tight text-wrap">
                            <span>{value || altValue}</span>
                        </h4>
                    </Button>
                </Link>
                <Separator className="my-2 w-full" />
            </div>
        )
    }
    else {
        return (
            <div className={`flex-1 space-y-3`} {...props}>
                <h4 className={`${className} scroll-m-20 flex space-x-2 text-xl font-semibold tracking-tight text-wrap`}>
                    <span className='flex items-center'>{children}</span>
                    <span>{value || altValue}</span>
                </h4>
                <Separator className="my-2 w-full" />
            </div>
        )
    }
}

export default profileCardText


