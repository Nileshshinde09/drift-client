import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { signUpSchema } from '@/schema'
import { Checkbox } from '../ui/checkbox'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Auth } from '@/services'
import { useToast } from '../ui/use-toast'
import { useDocumentTitle } from 'usehooks-ts'

const SignUp = () => {
  useDocumentTitle("Sign Up💎Drift...")
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 300);
  const [createpassword, setCreatepassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")

  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({

    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      gender: '',
      createPassword: '',
      confirmPassword: '',
      termsNConditions: false
    },
  });


  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername[0] != '') {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get(
            `/api/v1/users/check-unique-username/?username=${debouncedUsername[0]}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    ; (async () => await checkUsernameUnique())()
  }, [debouncedUsername[0]]);

  const onSubmit = async (data) => {
    if(!data.termsNConditions){
      toast(
        {
          title:"You need to agree with our terms and conditions.",
          variant: "destructive"
        }
      )
    }
    setIsSubmitting(true);
    try {
      console.log(data);
      const response = await Auth.createAccount(data);
      toast({
        title: 'Success',
        description: response.data.message,

      });
      setIsSubmitting(false);
      navigate("/login")
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error

      let errorMessage = axiosError.response?.data.message;
      // ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
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
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-balance text-black dark:text-white">
              Enter your details below to Sign up
            </p>
          </div>
          <div className="grid gap-4 text-black dark:text-white">
            <div className="grid gap-2">
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">Full Name</FormLabel>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="jhon d'souza"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">Username</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Striver"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                    />
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    {!isCheckingUsername && usernameMessage && (
                      <p
                        className={`text-sm ${usernameMessage === 'user name is unique'
                          ? 'text-green-500'
                          : 'text-red-500'
                          }`}
                      >
                        {usernameMessage}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black dark:text-white">Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className="text-black dark:text-white" value="male" >Male</SelectItem>
                        <SelectItem className="text-black dark:text-white" value="female">Female</SelectItem>
                        <SelectItem className="text-black dark:text-white" value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="text-black dark:text-white" htmlFor="createPassword">Create Password</Label>
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
                      placeholder="abc123"
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
                <Label className="text-black dark:text-white" htmlFor="confirmPassword">Confirm Password</Label>
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
                      placeholder="abc123"
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

            <FormField
              control={form.control}
              name="termsNConditions"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                    Accept terms and conditions
                    </FormLabel>
                    <FormDescription>
                      <Link to={"/@DriftSocial/terms-n-conditions"} > You agree to our Terms of Service and Privacy Policy.{" "}read terms and conditions</Link>
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {/* <TNC /> */}

            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            already have an account?{" "}
            <Link to={"/login"} className="underline">
              LogIn
            </Link>
          </div>
        </form>
      </Form>
    </>
  )
}

export default SignUp


