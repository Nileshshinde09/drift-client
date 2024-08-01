import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Bell } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { useDispatch } from 'react-redux'
import { setMessangerNotificationSoundTheme } from '@/app/slices/themeSlice'

const MessangerNotification = ({ children,music }) => {
    const dispatch = useDispatch();
    const { toast } = useToast()
    const handleMessangerNotificationSound = async () => {
        try {
            dispatch(setMessangerNotificationSoundTheme(music))
            toast({
                title: `Ringtone Added Successfully!`,
            })

        } catch (error) {
            toast({
                variant: "destructive",
                title: `Uh oh! ${error.message}`,
            })
            console.log(error.message || "Something went wrong while renaming group.")
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    children
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Set As <small className="text-2xl font-medium leading-none text-green-500"></small>.</DialogTitle>
                </DialogHeader>
                <div className="">
                    <div className="flex justify-center my-3 space-x-3 ">
                        <Button onClick={handleMessangerNotificationSound}>Set as Notification RingTone<Bell className='mx-1' /></Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MessangerNotification


