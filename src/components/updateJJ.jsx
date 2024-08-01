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
const UpdateJJdialog = ({ children, data,setToggle,toggle }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState(data?.content)
    const [isHide, setIsHide] = useState(false)
    const [isChanged, setIsChanged] = useState(false)
    const { toast } = useToast()
    useEffect(() => {
        setIsChanged(content === data.content && isHide === data.hide)
    }, [content, isHide])
    const updateHandler = async () => {
        const response = await Space.updateJJ({
            content,
            hide:isHide,
            postId: data._id
        })
        if(response.data.success){
            setToggle(!toggle)
            toast({
                title:response.data.message
            })
        }
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
                        Update Journey Journal
                    </h4>
                    <div className="flex flex-col">
                        <Label htmlFor="content" className="mb-2">Content</Label>
                        <Textarea id="content" value={content} className="h-[3rem]" onChange={(e) => setContent(e.target.value)} placeholder="Write your experience..." />
                    </div>
                    <div className="flex my-5">
                    <Label htmlFor="content" className="">Content</Label>
                        <Switch className="mx-2"
                            value={isHide}
                            onClick={(e) => {
                                setIsHide(e.target.ariaChecked === 'true')
                            }} />
                    </div>
                    <Button disabled={isChanged} onClick={updateHandler}>{!isLoading ? "Update" : <Loader className='animate-spin' />}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateJJdialog
