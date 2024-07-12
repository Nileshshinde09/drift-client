import { RocketIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { useEffect } from "react"

const Alert = ({ title, description ,destructive=false}) => {
    const [variant, setVariant] = useState("")
    useEffect(()=>{
        if(destructive){
            setVariant("destructive") 
        }else{
            setVariant("") 
        }
    },[variant])
    
    return (
        <Alert variant>
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>
                {
                    title
                }
            </AlertTitle>
            <AlertDescription>
                {
                    description
                }
            </AlertDescription>
        </Alert>
    )
}
export default Alert
