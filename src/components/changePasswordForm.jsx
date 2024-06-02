import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Auth } from '@/services'
import { Label } from '@radix-ui/react-label'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { useToast } from "@/components/ui/use-toast"
import { changePasswordSchema } from '@/schema'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Input } from './ui/input'

const ChangePasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createpassword, setCreatepassword] = useState("")
    const [confirmpassword, setConfirmpassword] = useState("")
    const { toast } = useToast();
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: '',
            createPassword: '',
            confirmPassword: ''
        },
    });


    const onSubmit = async (data) => {
        const { confirmPassword,oldPassword } = data;
        console.log(confirmPassword,oldPassword);
        setIsSubmitting(true);
        try {
            if (!confirmPassword || !oldPassword) {
                return
            }
            const response = await Auth.changeCurrentPassword({oldPassword,newPassword:confirmPassword});
            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,

                });
                navigate("/login")
            }

        } catch (error) {
            console.error('Error during changing password:', error);

            const axiosError = error

            let errorMessage = axiosError.response?.data.message;
            toast({
                title: 'Password Change Faild!',
                description: errorMessage,
                variant: 'destructive',
            });

        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 dark:text-white text-muted">
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="createPassword">Enter Old Password</Label>
                            </div>
                            <FormField
                                name="oldPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            id="    "
                                            name="oldPassword"
                                            type="password"
                                            placeholder="password"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                        <Link to={"/forgot-password"} className="underline">
                            Forgot Password ?
                        </Link>
                    </div>
                </form>
            </Form>
        </>

    )
}

export default ChangePasswordForm
