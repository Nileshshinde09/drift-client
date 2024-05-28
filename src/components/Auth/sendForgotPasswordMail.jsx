import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Auth } from '@/services'
import { useForm } from "react-hook-form"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { emailSchema } from '@/schema'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from '../ui/input'
import { VITE_HOST_URL } from '@/constants'

const sendForgotPasswordMail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data) => {
        try {
            const email = data.email;
            const passwordResetUrl = `${VITE_HOST_URL}/forgot-password/verify/`
            const sendEmailResponse = await Auth.sendForgotPasswordEmail({ passwordResetUrl, email })
            if (sendEmailResponse.data.statusCode === 404) {
                toast({
                    title: sendEmailResponse.data.message,
                    variant: "destructive"
                })
            }
            else if (sendEmailResponse.data.statusCode === 200) {
                toast({
                    title: sendEmailResponse.data.message,
                })
            }
        } catch (error) {
            console.log(error.message || "Something went wrong while sending email.");
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2 text-center ">
                        <h1 className="text-3xl font-bold text-white">Send Reset Password Email</h1>
                        <p className="text-balance text-muted dark:text-muted-foreground">
                            Submit email to reset forgotted password
                        </p>
                    </div>
                    {/* <BouncingBalls color='bg-white dark:bg-black my-5' /> */}
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange
                                    placeholder="nilesh@example.com"
                                    {...field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-4 text-center text-md text-white">
                        Re-send Email ?{" "}
                        <Button type="submit" variant="outline" className="mx-4 bg-black">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>

    )
}

export default sendForgotPasswordMail
