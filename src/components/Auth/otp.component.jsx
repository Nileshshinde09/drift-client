import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ChevronRight } from "lucide-react"
import { BouncingBalls } from '@/pages'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'
import { toast } from "@/components/ui/use-toast"

import { otpSchema } from '@/schema'

const OTP = () => {

  useEffect(()=>{
    
  },[])

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  })
  const onSubmit = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <h1 className="text-white text-2xl text-center">{data.pin}</h1>
        </pre>
      ),
    })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 text-center ">
            <h1 className="text-3xl font-bold text-white">OTP</h1>
            <p className="text-balance text-muted dark:text-muted-foreground">
              OTP Entry: Retrieve and Enter Code Sent to Your Email
            </p>
          </div>
          <BouncingBalls color='bg-white dark:bg-black' />
          <div className="grid gap-4 text-white border-white">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-[7rem] mx-auto" >Submit</Button>
          </div>
        </form>
      </Form>
          <div onClick={()=>{console.log("Hello")}} className="mt-4 text-center text-md text-white">
            Re-send OTP ?{" "}
            <Button variant="outline" className="mx-4 bg-black" size="icon">
              <ChevronRight className="h-4 w-4"/>
            </Button>
          </div>
    </>

  )
}

export default OTP
