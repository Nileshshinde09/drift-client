import React from 'react'
import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const updateProfileComponent = ({ className, props, children }) => {
  return (
    < Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle>Update Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {children}
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card >
  )
}

export default updateProfileComponent
