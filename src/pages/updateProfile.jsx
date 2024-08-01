import React, { useEffect, useState } from 'react';
import { UpdateProfileComponent, Avatar, AvatarDrawer } from '@/components';
import { DrawerTrigger, Drawer } from '@/components/ui/drawer';
import { useSelector } from 'react-redux';
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns"
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useDebounce } from 'use-debounce';
import axios from 'axios';
import { Profile } from '@/services';
import { detectChanges, convertToISOString } from '@/utils';
import { useDispatch } from 'react-redux';
import { setProfileData } from '@/app/slices/authSlices';
import { useDocumentTitle, useUploadImage } from '@/hooks';
import { CloudMedia } from '@/services';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { updateProfileSchema } from '@/schema';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
const avatarProps = {
  fullName: null,
  username: null
};

const UpdateProfile = () => {
  const userForTitle=useSelector(state=>state.auth.userData)
  const [user, setUser] = useState(null);
  const { userData, profileImageUrl } = useSelector(state => state.auth);
  // useDocumentTitle(`@${userData?.username} 💎Drift`)
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [updatedResponse, setUpdatedResponse] = useState("")
  const debouncedUsername = useDebounce(username, 200);
  const [file, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploadedImageId, setUploadedImageId] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { toast } = useToast()
  const dispatch = useDispatch()

  const { isImageUploaded, imageId, anoImageUrl, fileData, status } = useSelector(state => state.updateProfile)

  useEffect(() => {
    if (userData) {
      setUser(userData);
      form.reset({
        username: userData?.username || '',
        fullName: userData?.fullName || '',
        gender: userData?.gender || '',
        dob: new Date(userData?.dob) || '',
        bio: userData?.bio || '',
      });
    }
  }, [userData, updatedResponse]);

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername[0] == userData?.username) {setUsernameMessage("")}
      if (debouncedUsername[0] != '' && debouncedUsername[0] != userData?.username) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response = await axios.get(
            `/api/v1/users/check-unique-username/?username=${debouncedUsername[0]}`
          );
          setUsernameMessage(response?.data?.message);
        } catch (error) {
          const axiosError = error;
          setUsernameMessage(
            axiosError?.response?.data?.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    ; (async () => await checkUsernameUnique())()
  }, [debouncedUsername[0]]);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: '',
      fullName: '',
      gender: '',
      dob: '',
      bio: '',
    },
  });

  const onSubmit = async (values) => {

    if (values.dob) {
      values.dob = convertToISOString(String(values.dob))
    }

    if (status && !isImageUploaded && imageId) {
      values.avatar = imageId
    }

    if (status && isImageUploaded && fileData) {
      try {
        setIsImageUploading(true)
        const response = await CloudMedia.uploadImage(fileData)
        if (response?.data?.data?.uploadedImage) {
          values.avatar = response?.data?.data?.uploadedImage?._id
          setUploadedImageId(response?.data?.data?.uploadedImage?._id);
          setUploadedImageUrl(response.data?.data?.uploadedImage?.URL);
        }
        setIsImageUploading(false)
      } catch (error) {
        setIsImageUploading(false)
        toast({
          title: "Failed to Upload Image !!",
          discription: error.message || "Something went wrong while uploading image!!",
          variant: "destructive"
        })
      }

      try {

        if (uploadedImageId) {
          values.avatar = uploadedImageId;
        }
      } catch (error) {
        toast({
          title: "Image Upload Failed !!",
          description: error.message || "Something went wrong while uploading image!!",
          variant: "destructive"
        })
        return;
      }
    }

    console.log("Old :: ", userData.avatar);
    console.log("New :: ", values.avatar);

    const updatedData = detectChanges(userData, values);
    console.log(updatedData)
    if (Object.keys(updatedData).length === 0) {
      toast({
        title: "Nothing to Update!!"
      })
    } else {
      try {
        const response = await Profile.updateProfile(updatedData)
        dispatch(setProfileData(response.data.data))
        setUpdatedResponse(response.data.data)
        toast({
          title: "Update Successfully !!",
        })

      } catch (error) {

        toast({
          title: "Updation Failed !!",
          description: error.message || "something went wrong while update the profile.",
          variant: "distructive"

        })
      }
    }


  }

  return (
    <>
      <Drawer>
        <div className='mx-auto no-scrollbar overflow-y-scroll h-[800px] pb-[15rem]'>
          <UpdateProfileComponent className={"w-full"}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mx-auto">
                <div className="flex justify-center">
                  <DrawerTrigger>
                    <Avatar {...avatarProps} url={profileImageUrl} />
                    {/* <Avatar {...avatarProps} url={userData?.avatar} /> */}
                  </DrawerTrigger>
                </div>

                <div className=''>
                  <div className='sm:flex space-x-2'>

                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="username" {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                setUsername(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="fullName" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>bio</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Bio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male" >Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="others">Others</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel> Date of birth </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">

                              <Calendar

                                mode="single"
                                defaultValue={field.value}
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Your date of birth is used to show on your profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type={"submit"} disabled={isCheckingUsername || isImageUploading || usernameMessage == "User Already exist"} className="w-full">
                  Update Profile
                </Button>
              </form>
            </Form>
          </UpdateProfileComponent>
        </div>
        <AvatarDrawer />
      </Drawer>
    </>
  );
};

export default UpdateProfile;
