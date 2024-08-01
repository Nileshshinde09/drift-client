import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Auth } from '@/services'
import { Label } from '@radix-ui/react-label'
import { useForm } from "react-hook-form"
import { Loader2 } from 'lucide-react'
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { resetPasswordSchema } from '@/schema'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Input } from '../ui/input'
import { VITE_HOST_URL } from '@/constants'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useDocumentTitle } from 'usehooks-ts'
const VerifyForgotPassword = () => {
    useDocumentTitle("Verify Forgot Password💎Drift...")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createpassword, setCreatepassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const [pageVerificaiton, setPageVerificaiton] = useState(false)
    const [cookies, setCookie] = useCookies()
    const { token } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            createPassword: '',
            confirmPassword: ''
        },
    });

    useEffect(() => {
        if (token) {
            setCookie('resetforgotpasswordToken', token, { path: '/' })
                ; (
                    async () => {
                        const pageVerificationResponse = await Auth.verifyForgotPasswordPageVerification()
                        if (pageVerificationResponse.data.statusCode === 200) {
                            setPageVerificaiton(true)
                        }
                    }
                )();
        }
    }, [token])
    const onSubmit = async (data) => {
        const { confirmPassword } = data;
        setIsSubmitting(true);
        try {
            if (!confirmPassword) {
                return
            }
            const response = await Auth.resetForgotPasswordEmail(confirmPassword);
            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,

                });
                navigate("/login")
            }

        } catch (error) {
            console.error('Error during resetting password:', error);

            const axiosError = error

            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Reset Password Faild!',
                description: errorMessage,
                variant: 'destructive',
            });

        }
        finally {
            setIsSubmitting(false);
        }
    }
    if (!pageVerificaiton)
        return (
            <h1>Page Not Verified </h1>
        )

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2 text-center ">
                        <h1 className="text-3xl font-bold">Reset Password</h1>
                        <p className="text-balance text-muted dark:text-muted-foreground">
                            Create New Password
                        </p>
                    </div>
                    <div className="grid gap-4 dark:text-white text-muted">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="createPassword">Create Password</Label>
                            </div>
                            <FormField
                                name="createPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            id="createPassword"
                                            name="createPassword"
                                            type="password"
                                            placeholder="password"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setCreatepassword(e.target.value);
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                            </div>
                            <FormField
                                name="confirmPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="password"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setConfirmpassword(e.target.value);
                                            }}
                                        />
                                        <FormMessage />
                                        {confirmpassword != "" && createpassword != "" && confirmpassword != createpassword ? (
                                            <p
                                                className={'text-sm text-red-500'}
                                            >
                                                The passwords did not match
                                            </p>
                                        ) : null}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className='w-full' disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </>

    )
}

export default VerifyForgotPassword
