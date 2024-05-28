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
import { Logout } from '.'
const userProfileDropdown = () => {
    const image = useSelector(state=>state.auth.profileImageUrl)
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
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Logout/></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default userProfileDropdown