import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React from 'react'
import { CreateVideoPostComponent,CreateImagePostComponent } from '@/components'
const createPost = () => {
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
