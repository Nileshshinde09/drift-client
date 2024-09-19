import { JjParticipantLayout, OpenSpaceDialog, SelectGroupTopic } from '@/components'
import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { AudioLines, Loader } from 'lucide-react';
import { Input } from 'postcss'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'
import ConfettiExplosion from 'react-confetti-explosion';
import { Space } from '@/services'
const CreateJJ = () => {
    const { toast } = useToast();
    const navigate = useNavigate()
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [isLoading,setIsLoading]=useState(false)
    const [isExploding, setIsExploding] = useState(false);
    const [spaceData,setSpaceData]=useState(null)
    const handleCreate = async () => {
        if (!content || !topic) return;
        try {
            setIsLoading(true);
            
            const response = await Space.createJJNSpace({
                content, topic
            })
            
            if (response.data.success) {
                setSpaceData(response.data.data.JJ);
                setIsExploding(false)
                setIsExploding(true)
                toast({
                    title:"Space and Post created successfully!"
                })
            }
        } catch (error) {
            toast(
                {
                    title: error.message || "Something went wrong while creating post and space.",
                    variant: "destructive"
                }
            )
            console.log(error.message || "Something went wrong while creating post and space.");
        }
        finally{
            setIsLoading(false)
        }
    }
    return (
        <div className='bg-black flex justify-center space-x-4 mx-auto w-screen h-screen absolute'>
            <div className='h-[85%] overflow-y-scroll no-scrollbar mt-14 w-[60%] rounded-2xl border-spacing-2 border-double border-white border-2'>
                <Card className="w-1/2 max-h-[50%] overflow-y-scroll no-scrollbar mx-auto my-5 bg-white hover:scale-105 transition-transform shadow-sm shadow-white text-black relative">
                    {isExploding && <ConfettiExplosion className='absolute'/>}
                    {isExploding && <ConfettiExplosion className='absolute'/>}
                    {/* <AudioLines className='absolute m-5 hover:scale-110 transition-transform cursor-pointer' /> */}
                    
                    <CardHeader>
                        <CardTitle className="text-center">{topic || "Not Available"}</CardTitle>
                    </CardHeader>
                    <CardContent >
                        {
                            content || "Not Available"
                        }
                    </CardContent>
                </Card>
                <Separator className="w-[98%] my-5 bg-white mx-auto" />
                <div className='w-1/2 mx-auto space-y-3'>
                    <div className="flex flex-col">
                        <Label htmlFor="framework" className="mb-2">Topic</Label>
                        <SelectGroupTopic setTopic={setTopic} selectedTopic={topic} />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="content" className="mb-2">Content</Label>
                        <Textarea id="content" value={content} className="h-[10rem]" onChange={(e) => setContent(e.target.value)} placeholder="Write your experience..." />
                    </div>
                    <div className='flex justify-between space-x-10'>
                        <Button className="w-1/2" onClick={() => {
                            setContent("")
                            setTopic("")
                        }}>Reset</Button>
                        <OpenSpaceDialog isLoading={isLoading} spaceData={spaceData}>
                        <Button className="w-1/2" disabled={!content || !topic} onClick={handleCreate}>{!isLoading?"Create":<Loader className='animate-spin'/>}</Button>
                        </OpenSpaceDialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateJJ
