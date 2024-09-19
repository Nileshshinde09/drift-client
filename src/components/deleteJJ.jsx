import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { Space } from "@/services"
import { useState } from "react"
import { Input } from "./ui/input"
import { useNavigate } from "react-router-dom"
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Loader } from 'lucide-react'
const DeleteJJdialog = ({ children, data, setToggle, toggle }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const deleteHandler = async () => {
        setIsLoading(true)
        const response = await Space.deletePostAndSpace(data._id);
        setToggle(!toggle)
        if (response.data.success) {
            setToggle(!toggle)
            toast({
                title: response.data.message
            })
        }
        setIsLoading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center"></DialogTitle>
                </DialogHeader>
                <div className="">
                    <h4 className="scroll-m-20 text-center text-xl font-semibold tracking-tight">
                        Delete Journey Journal - This means your are going to delete both group and Post.
                    </h4>
                    <Button className="w-fit mx-auto" onClick={()=>deleteHandler()}>{!isLoading ? "Delete" : <Loader className='animate-spin' />}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteJJdialog
