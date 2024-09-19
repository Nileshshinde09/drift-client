import React, { useEffect } from 'react'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { logInSchema } from '@/schema'
import { Loader2 } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Auth } from '@/services'
import { useToast } from '../ui/use-toast'
import { useDispatch } from 'react-redux'
import { login, emailAuthenticated } from '@/app/slices/authSlices'
import { useDocumentTitle, useExistingUser } from '@/hooks'
const Login = () => {
  useDocumentTitle("Login💎Drift...")
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
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
      console.log(response.status);
      if(response.status===201){
        toast({
          title: 'Failed',
          description: response.data.message,
        });
      }
      if(response.status===200){
        toast({
        title: 'Success',
        description: response.data.message,
      });
      }
      if (response?.statusText==="OK"){
         dispatch(login(response?.data?.data?.user))
         if (response?.data?.data?.user?.emailVerified) dispatch(emailAuthenticated(response.data.data.user.emailVerified))
        }
      setIsSubmitting(false);

    } catch (error) {
      console.error('Error during login:', error);
      const axiosError = error
      let errorMessage = axiosError.response?.data.message;
      console.log(axiosError);
      console.log();
      
      toast({
        title: 'Login Failed',
        description: response?.data.message,
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
            <h1 className="text-3xl font-bold text-black dark:text-white">Login</h1>
            <p className="text-balance text-black dark:text-white">
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
                    <FormLabel className="text-black dark:text-white">Email</FormLabel>
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
                <Label htmlFor="password" className='text-black dark:text-white'>Password</Label>
                <Link
                  to={"/forgot-password"}
                  className="text-black dark:text-white ml-auto inline-block text-sm underline"
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
          <div className="mt-4 text-center text-sm text-black dark:text-white">
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
