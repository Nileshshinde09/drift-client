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
    <Card className="md:w-[400px] w-[350px]">
      <CardHeader>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex w-full items-center justify-center gap-4">
            <ImageCarousel nextNpreviousArrows={false}/>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <HoverCard/>
        <CardTitle></CardTitle>
        <CardDescription>Deploy your new project in one-click.Deploy your new p</CardDescription>
      </CardFooter>
    </Card>
  )
}

export default postCard
