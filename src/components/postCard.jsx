import * as React from "react"
import HoverCard from "./hoverCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ImageCarousel from "./carousel"

const postCard = () => {
  return (
    <Card className="md:w-[500px] w-[350px]">
      <CardHeader>
      <HoverCard/>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex w-full items-center justify-center gap-4">
            <ImageCarousel />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardFooter>
    </Card>
  )
}

export default postCard
