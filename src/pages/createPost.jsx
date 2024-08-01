import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React from 'react'
import { CreateVideoPostComponent,CreateImagePostComponent } from '@/components'
import { useDocumentTitle } from "usehooks-ts"
const createPost = () => {
  useDocumentTitle("Create Post💎Drift")
  return (
    <div className="mx-auto">
      <Tabs defaultValue="ImagePost" className="sm:w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ImagePost">Image Post</TabsTrigger>
          <TabsTrigger value="VideoPost">Video Post</TabsTrigger>
        </TabsList>
        <TabsContent value="ImagePost">
        <CreateImagePostComponent/>
        </TabsContent>
        <TabsContent value="VideoPost">
          <CreateVideoPostComponent/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default createPost
