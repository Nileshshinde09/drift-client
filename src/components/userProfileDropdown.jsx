import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import { FriendRequestSheet, Logout } from '.'
import { useNavigate } from 'react-router-dom'
import { DrawerTrigger } from './ui/drawer'

const userProfileDropdown = () => {
    const image = useSelector(state => state.auth.profileImageUrl)
    const user = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                >
                    <img
                        src={image}
                        width={40}
                        height={40}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => navigate(`/profile/@${user?.username}`)}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/messanger`)}>Messanger</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/music-library`)}>Music Library</DropdownMenuItem>
                <DropdownMenuItem onClick={() =>navigate("/update-profile")} >Update Profile</DropdownMenuItem>
                <DrawerTrigger><DropdownMenuItem>Settings</DropdownMenuItem></DrawerTrigger>
                <DropdownMenuItem onClick={() => navigate(`/@DriftSocial/support`)}>Support</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/@DriftSocial/about`)}>About</DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* <DropdownMenuItem><FriendRequestSheet>Friend Requests</FriendRequestSheet></DropdownMenuItem> */}
                <DropdownMenuItem><Logout variant={"ghost"} /></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default userProfileDropdown