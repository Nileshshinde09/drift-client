import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React, { useEffect } from 'react'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { supportFormSchema } from '@/schema'
import { Loader2, Mail,VenetianMaskIcon } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Auth } from '@/services'
import { useDispatch } from 'react-redux'
import { login, emailAuthenticated } from '@/app/slices/authSlices'
import { useDocumentTitle, useExistingUser } from '@/hooks'
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

const Support = () => {
  useDocumentTitle("Drift Support")
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [loading, data] = useExistingUser()

  const form = useForm({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      email: '',
      subject: '',
      content:''
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      // const response = await Auth.loginToAccount(data);
      // toast({
      //   title: 'Success',
      //   description: response.data.message,
      // });
      // if (response) dispatch(login(response?.data?.data?.user))
      // if (response?.data?.data?.user?.emailVerified) dispatch(emailAuthenticated())
      setIsSubmitting(false);
    } catch (error) {
      // console.error('Error during login:', error);
      // const axiosError = error
      // let errorMessage = axiosError.response?.data.message;
      // toast({
      //   title: 'Login Failed',
      //   description: errorMessage,
      //   variant: 'destructive',
      // });

      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <h1 className="text-center my-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        DriftSocial@Support
      </h1>
      <div className='w-1/2 mx-auto'>
        <h4 className="mx-auto my-[2rem] w-fit scroll-m-20 text-xl font-semibold tracking-tight">
          Contact to @DriftSocial support 
        </h4>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2 text-center ">
              <h1 className="text-3xl font-bold">Submit Query</h1>
              <p className="text-balance dark:text-muted-foreground text-muted">
                Enter your email,subject and content into below fields.
              </p>
            </div>
            <div className="grid gap-4 dark:text-white text-muted">
              <div className="grid gap-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2"><h1>Email</h1> <Mail/></FormLabel>
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
                  name="subject"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Input
                        id="subject"
                        type="text"
                        name="subject"
                        placeholder="subject..."
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <Textarea
                        id="content"
                        type="text"
                        name="content"
                        placeholder="Write your content or ask your queries here..."
                        {...field}
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
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className='w-1/2 mx-auto my-[2rem]'>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default Support
