import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Auth } from '@/services'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
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
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { emailAuthenticated } from '@/app/slices/authSlices'

const OTP = () => {
  const [isOTPSubmited, setIsOTPSubmited] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  })

  const onSubmit = async (data) => {
    if (data.pin) {
      const validationResponse = await Auth.getvalidatedEmailOtp(data.pin)
      if (validationResponse.data.data.emailVerified) {
        toast({
          title: "Your email verified successfully!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <h1 className="text-white text-2xl text-center">{"Success"}</h1>
            </pre>
          ),
        })
        navigate("/")
      }else if(validationResponse.data.data.isInvalid){
        toast({
          title: "Envalid OTP",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <h1 className="text-white text-2xl text-center">{"Failed !"}</h1>
            </pre>
          ),
        })
      }else if(validationResponse.data.data.isExpired){
        toast({
          title: "OTP Expired",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <h1 className="text-white text-2xl text-center">{"Failed !"}</h1>
            </pre>
          ),
        })
        setIsOTPSubmited(false)
      }
    }
  }
  const sendOTPHandler = async () => {
    setIsOTPSubmited(true)
    const generateOTPResponse = await Auth.generateEmailOtp()
    if (generateOTPResponse.data.data.emailVerified) {
      toast({
        title: "Your email has already verified!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <h1 className="text-white text-2xl text-center">{"Success"}</h1>
          </pre>
        ),
      })

      dispatch(emailAuthenticated(true))
      navigate("/")

    }
    console.log(generateOTPResponse);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 text-center ">
            <h1 className="text-3xl font-bold text-white">OTP</h1>
            {/* <p className="text-balance text-muted dark:text-muted-foreground">
              OTP Entry: Retrieve and Enter Code Sent to Your Email
            </p> */}
          </div>
          <BouncingBalls color='bg-white dark:bg-black my-5' />
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
            {
              !isOTPSubmited ?
                <>
                  <Button className="w-[7rem] mx-auto" onClick={() => sendOTPHandler()} >Send OTP</Button>
                </>
                :
                <>
                  <Button type="submit" className="w-[7rem] mx-auto">Submit</Button>
                </>
            }
          </div>
        </form>
      </Form>
      <div onClick={() => { console.log("Hello") }} className="mt-4 text-center text-md text-white">
        Re-send OTP ?{" "}
        <Button variant="outline" className="mx-4 bg-black" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>

  )
}

export default OTP
