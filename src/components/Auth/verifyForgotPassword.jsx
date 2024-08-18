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
import { Logout } from '..'

const VerifyForgotPassword = () => {
    useDocumentTitle("Verify Forgot Password💎Drift...");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [createPassword, setCreatePassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pageVerification, setPageVerification] = useState(false);

    const [cookies, setCookie] = useCookies(['resetforgotpasswordToken']);

    const { token } = useParams();

    const { toast } = useToast();

    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            createPassword: '',
            confirmPassword: ''
        },
    })  

    useEffect(() => {
        if (token) {
            if (!token.resetforgotpasswordToken) {
                setCookie('resetforgotpasswordToken', token, { path: '/' });
            }
            (async () => {
                try {
                    const response = await Auth.verifyForgotPasswordPageVerification();
                    if (response.data.statusCode === 200) {
                        setPageVerification(true);
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                }
            })();
        }
    }, [token, cookies.resetforgotpasswordToken, setCookie]);

    const onSubmit = async (data) => {
        const { confirmPassword } = data;
        setIsSubmitting(true);

        try {
            if (!confirmPassword) {
                return;
            }

            const response = await Auth.resetForgotPasswordEmail(confirmPassword);
            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: response.data.message,
                });
                navigate("/login");
            }

        } catch (error) {
            console.error('Error during resetting password:', error);

            const errorMessage = error.response?.data.message || 'Failed to reset password';
            toast({
                title: 'Reset Password Failed!',
                description: errorMessage,
                variant: 'destructive',
            });

        } finally {
            setIsSubmitting(false);
        }
    };

    if (!pageVerification) {
        return <h1>Page Not Verified</h1>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="text-muted dark:text-muted-foreground">
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
                                            setCreatePassword(e.target.value);
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
                                            setConfirmPassword(e.target.value);
                                        }}
                                    />
                                    <FormMessage />
                                    {confirmPassword && createPassword && confirmPassword !== createPassword ? (
                                        <p className="text-sm text-red-500">
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
    );
};

export default VerifyForgotPassword;