import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton} from "./ui/skeleton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const ImageCarousel = ({ nextNpreviousArrows = false, images=[] }) => {
  if(!images) return <Skeleton className={"w-full max-w-xs"}/>
  return (
      <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from(images).map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img className="w-fit" src={url || null }/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {
        nextNpreviousArrows && nextNpreviousArrows ?
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
          :
          null
      }
    </Carousel>
  )
}
export default ImageCarousel