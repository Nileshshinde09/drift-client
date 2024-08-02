import { setMessangerTheme } from "@/app/slices/themeSlice"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LogIn } from "lucide-react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const ThemeDialog = ({children,color}) => {
    const dispatch=useDispatch() 
 
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    children
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Select</DialogTitle>
                </DialogHeader>
                <div className={`w-full h-20 hover:scale-105 transition rounded-3xl ${color} shadow-white shadow-md`}>
                </div>
                <div className="text-center my-2 text-white">{color}</div>
                <LogIn className="w-6 h-auto mx-auto cursor-pointer" onClick={()=>dispatch(setMessangerTheme(color))}/>
            </DialogContent>
        </Dialog>
    )
}
export default ThemeDialog;
