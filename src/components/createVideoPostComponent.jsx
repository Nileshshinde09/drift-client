import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { SelectComponent } from "@/components"
import { VIDEO_ALLOWED_TYPES, VIDEO_POST_MAX_FILES } from "@/constants"
import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons"
import { Post } from "@/services"
const CreateVideoPost = () => {

  const { toast } = useToast()
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false)
  const [tag, setTag] = useState('')
  const [caption, setCaption] = useState("")
  const handleFileChange = (event) => {

    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles)
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (files.length <= 0) {
      toast(
        {
          title: "Warning!!",
          description: 'Video required to upload Post.',
          variant: 'destructive'
        }
      )
      return;
    }
    try {
      setIsUploading(true)
      const createVideoPostResponse = await Post.createVideoPost({ caption, tag, files })
      console.log(createVideoPostResponse);
      if(createVideoPostResponse?.data?.data){
        toast({
          title:"Post Created Successfully!!"
        })
      }
      else if(!createVideoPostResponse?.data) {
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

  return (
    <Card className="mx-auto w-full">
      <form onSubmit={handleFormSubmit}>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create Video Post</CardTitle>
        <CardDescription className="text-center">
          Create Video Post with attractive and influential content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 space-y-7">
          <label className="block">
            <span className="sr-only">Choose profile Video</span>
            <input type="file" onChange={handleFileChange} multiple="single" accept=".mp4" className="block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:text-neutral-500
                dark:file:bg-blue-500
                dark:hover:file:bg-blue-400"/>
          </label>
          <div className="grid gap-2">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="caption">Your Caption</Label>
              <Textarea onChange={(e) => setCaption(e.target.value)} placeholder="Type your caption here." id="caption" />
            </div>
          </div>
          <div className="grid gap-2">
            <SelectComponent setTag={setTag} />
          </div>
          <div className="grid gap-2">
            {
              isUploading ?
                <>
                  <Button disabled className="w-fit mx-auto">
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Uploading Please Wait
                  </Button>
                </>
                :
                <>
                  <Button className="w-fit mx-auto">
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Uploade
                  </Button>
                </>
            }
          </div>
        </div>
      </CardContent>
      </form>
    </Card>
  )
}
export default CreateVideoPost;