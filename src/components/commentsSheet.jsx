import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    SendHorizonal
} from "lucide-react"
import { Comment } from "."
const commentSheet = ({ children }) => {
    return (
        <Sheet className="relative">
            <SheetTrigger asChild>
                {children}
                {/* <Button variant="outline">Open</Button> */}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Comments</SheetTitle>
                    {/* <SheetDescription>
                        
                    </SheetDescription> */}
                <div className="flex w-full max-w-sm items-center space-y-2 space-x-2">
                    <div></div>
                    <Input type="text" placeholder="comment 😎😎😎" />
                    <SendHorizonal className="hover:scale-125" />
                </div>
                </SheetHeader>
                <div className="overflow-y-scroll no-scrollbar space-y-5 h-screen">
                    <div></div>
                    <Comment commentator={""}/>
                </div>
            </SheetContent>
        </Sheet>
    )
}
export default commentSheet;