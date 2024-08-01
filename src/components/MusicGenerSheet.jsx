import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AUDIO_LIBRARY_THEME } from "@/constants";
import { cn } from "@/lib/utils";
const MusicGenerSheet = ({children,generData,setGener}) => {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Sheet key={"top"}>
                <SheetTrigger asChild>
                    {children}
                </SheetTrigger>
                <SheetContent side={"top"}>
                    <div className="my-10 flex justify-center space-x-4 items-center m-2 w-full ">
                        <div/>
                        {Object.keys(generData).map((value)=>(
                            <div onClick={()=>setGener(value)} className={cn("py-2 px-4 rounded-full hover:opacity-90 cursor-pointer",AUDIO_LIBRARY_THEME[Math.floor(Math.random() * AUDIO_LIBRARY_THEME.length)])}>
                             <div className="text-lg font-semibold">{value}</div>
                            </div>
                        ))
                        }
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
export default MusicGenerSheet;

