import React, { useEffect } from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom'
const NotificationSonnar = ({ payload = "", url = null }) => {
    const navigate = useNavigate()
    useEffect(()=>{
        toast(payload ? payload : "No Message", {
            description: payload ? payload : "No Message",
            action: {
                label: "Open",
                onClick: () => navigate(url?url:'/'),
            },
        })
    },[])
}

export default NotificationSonnar
