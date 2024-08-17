import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { SelectComponent } from "@/components"
import { IMAGE_ALLOWED_TYPES, IMAGE_POST_MAX_FILES } from "@/constants"
import { Post } from "@/services"
import ImageCarousel from "./carousel"
import { useSelector } from 'react-redux'
import { useMediaIdToUrl } from "@/hooks"
import { Edit3 } from "lucide-react"
const editImagePost = () => {
    const post = useSelector(state => state.managePost.updatePostData)
    const [captionValue, setCaptionValue] = useState("")
    const { toast } = useToast()
    const [files, setFiles] = useState([]);
    const [caption, setCaption] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [tag, setTag] = useState('')
    const [setIdList, urlList, isConverting] = useMediaIdToUrl()

    useEffect(() => {
        if (post) {
            setCaptionValue(post.caption)
            setTag(post.tags)
            setIdList(post.images)
        }
    }, [post])
    const handleFileChange = (event) => {
        const selectedFiles = event.target.files

        if (selectedFiles.length > IMAGE_POST_MAX_FILES) {
            toast({
                title: "Warning!!",
                description: `You can only select up to ${IMAGE_POST_MAX_FILES} files.`
            })
            return;
        }

        if (selectedFiles.length !== selectedFiles.length) {
            toast({
                title: "Warning!!",
                description: 'Some files were not allowed and have been filtered out.'
            })
        }

        setFiles(selectedFiles);
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (files.length <= 0) {
            toast(
                {
                    title: "Warning!!",
                    description: 'Images required to upload Post.',
                    variant: 'destructive'
                }
            )
            return;
        }
        if (post) {
            try {
                setIsUploading(true)
                const editImagePostResponse = await Post.editPostContent(post._id)
                if (!editImagePostResponse.data) {
                    toast(
                        {
                            title: "Warning!!",
                            description: 'Uploading Failed.',
                            variant: 'destructive'
                        }
                    )
                    setIsUploading(false)
                    return;
                }
                setIsUploading(false)
                toast(
                    {
                        title: "Success 🏆🏆!!",
                        description: 'Post Uploaded Successfully !!.',
                    }
                )

            } catch (error) {
                setIsUploading(false)
                toast(
                    {
                        title: "Warning!!",
                        description: error.message,
                        variant: 'destructive'
                    }
                )
            }
        }
    }

    return (

        <div className="h-screen">
            <Card className="sm:absolute inset-0 m-auto w-full max-w-3xl max-h-full overflow-y-auto no-scrollbar p-6">
                <form onSubmit={handleFormSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Edit Image Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div onClick={() => { console.log("Hello") }} className="flex w-full items-center justify-center space-y-3">
                            {urlList ?
                                <ImageCarousel nextNpreviousArrows={false} images={urlList} />
                                :
                                <></>
                            }
                        </div>
                        <div className="grid gap-4 space-y-7">
                            <label className="block">
                                <Label htmlFor="caption">Select New Images To replace with old image</Label>
                                <input type="file" placeholder="Select image to replace" onChange={handleFileChange} multiple="multiple" accept=".jpg, .jpeg, .png, .mp3"
                                    className="block w-full text-sm text-gray-500
                                        file:me-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-600 file:text-white
                                        hover:file:bg-blue-700
                                        file:disabled:opacity-50 file:disabled:pointer-events-none
                                        dark:text-neutral-500
                                        dark:file:bg-blue-500
                                        dark:hover:file:bg-blue-400" />
                            </label>
                            <div className="grid gap-2">
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="caption">Your Caption</Label>
                                    <Textarea value={captionValue } onChange={(e) => setCaption(e.target.value)} placeholder="Type your caption here." id="caption" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                            <Label htmlFor="caption">Select Tag</Label>
                                <SelectComponent setTag={setTag} selectedTag={tag} />
                            </div>
                            <div className="grid gap-2">
                                {isUploading ?
                                    <Button disabled className="w-fit mx-auto">
                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                        Uploading Please Wait
                                    </Button>
                                    :
                                    <Button type="submit" className="w-fit mx-auto">
                                        <UploadIcon className="mr-2 h-4 w-4" />
                                        Upload
                                    </Button>
                                }
                            </div>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>

    )
}
export default editImagePost;