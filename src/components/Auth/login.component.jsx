import React, { useEffect } from 'react'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { logInSchema } from '@/schema'
import { Loader2 } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Auth } from '@/services'
import { useToast } from '../ui/use-toast'
import { useDispatch } from 'react-redux'
import { login, emailAuthicated } from '@/app/slices/authSlices'
const Login = () => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const getExistingUser = async () => {
      try {
        const response = await Auth.getUser()
        if (response) dispatch(login(response?.data?.data))
        //TODO: change this code when you going to production 👇👇
        if (response?.data?.data?.emailVerified) dispatch(emailAuthicated(response?.data?.data?.emailVerified))
      } catch (error) {
        console.log(`User not found :: ${error}`);
      }
    }
    ;(async ()=> await getExistingUser())()
  }, [])
  const form = useForm({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await Auth.loginToAccount(data);
      toast({
        title: 'Success',
        description: response.data.message,

      });
      if (response) dispatch(login(response?.data?.data?.user))
      if (response?.data?.data?.user?.emailVerified) dispatch(emailAuthicated())
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during login:', error);
      const axiosError = error
      let errorMessage = axiosError.response?.data.message;
      ('There was a problem with your login. Please try again.');
      toast({
        title: 'Login Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2 text-center ">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance dark:text-muted-foreground text-muted">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4 dark:text-white text-muted">
            <div className="grid gap-2">
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
                      placeholder="m@example.com"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to={"/forgot-password"}
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="abc123"
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
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Login'
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-white">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}

export default Login
