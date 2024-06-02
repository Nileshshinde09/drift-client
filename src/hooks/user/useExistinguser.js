import { useState,useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useDispatch } from "react-redux"
import { Auth } from "@/services"
import { login,emailAuthenticated } from '@/app/slices/authSlices'
import { useAvatarImage } from "../MediaContent/useAvatarImage"
const useExistingUser = () => {
    const [loading, setLoading] = useState(true)
    const [data,setData] = useState(null)
    const dispatch = useDispatch()
    const [avatarError,setId] = useAvatarImage()
    const {toast} = useToast();
    useEffect(() => {
        ;(async ()=> {
            setLoading(true)
          try {
            const response = await Auth.getUser()
            if (response){
                 dispatch(login(response?.data?.data))
                    setData(response?.data?.data)
                }
            if (response?.data?.data?.emailVerified) dispatch(emailAuthenticated(response?.data?.data?.emailVerified))
            if (response?.data?.data?.avatar) setId(response?.data?.data?.avatar)
            } catch (error) {
            toast({
                title:error.message || "Somthing went wrong while getting existing user.",
                variant: "destructive"
            })
            console.log(`User not found :: ${error}`);
          }finally{
            setLoading(false)
          }
         
        })()
      setLoading(false)
    }, [dispatch])
    return [loading,data]
}

export default useExistingUser