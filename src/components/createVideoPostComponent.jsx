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

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { SelectComponent } from "@/components"
import { VIDEO_ALLOWED_TYPES,VIDEO_POST_MAX_FILES } from "@/constants"
import { ReloadIcon,UploadIcon } from "@radix-ui/react-icons"
const CreateVideoPost = () => {
  const { toast } = useToast()
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false)
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const filteredFiles = selectedFiles.filter(file => VIDEO_ALLOWED_TYPES.includes(file.type));

    if (filteredFiles.length > VIDEO_POST_MAX_FILES) {
      toast({
        title: "Warning!!",
        description: `You can only select up to ${VIDEO_POST_MAX_FILES} files.`
      })
      return;
    }

    if (filteredFiles.length !== selectedFiles.length) {
      toast({
        title: "Warning!!",
        description: 'Some files were not allowed and have been filtered out.'
      })
    }
    setFiles(filteredFiles);
  };
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create Video Post</CardTitle>
        <CardDescription className="text-center">
          Create Video Post with attractive and influential content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 space-y-7">
          <label class="block">
            <span class="sr-only">Choose profile photo</span>
            <input type="file" onChange={handleFileChange} multiple="multiple" accept=".jpg, .jpeg, .png, .mp3" class="block w-full text-sm text-gray-500
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
              <Textarea placeholder="Type your caption here." id="caption" />
            </div>
          </div>
          <div className="grid gap-2">
            <SelectComponent />
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
    </Card>
  )
}
export default CreateVideoPost;