import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@react-hook/media-query"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ChangePasswordForm } from "."
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ChangePassword = () => {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Change Password</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="mx-auto">Change Password</DialogTitle>
                        <DialogDescription className="flex flex-wrap">
                            Enter old password to change your current password.
                        </DialogDescription>
                    </DialogHeader>
                    <ChangePasswordForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Change Password</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Change Password</DrawerTitle>
                    <DrawerDescription>
                    Enter old password to change your current password.
                    </DrawerDescription>
                </DrawerHeader>
                <ChangePasswordForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className }) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" defaultValue="shadcn@example.com" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@shadcn" />
            </div>
            <Button type="submit">Save changes</Button>
            <Link to={"/forgot-password"} className="underline">
                Forgot Password ?
            </Link>
        </form>
    )
}


export default ChangePassword;