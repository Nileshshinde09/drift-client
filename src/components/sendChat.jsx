import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SmilePlusIcon, Paperclip, Mic, CornerDownLeft } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { Textarea } from "@/components/ui/textarea"
import { useDispatch } from 'react-redux';
import { addMessages, setMessage as setStoreMessage } from '@/app/slices/messangerSlice';
import { Label } from './ui/label';
import { Tooltip, TooltipContent } from './ui/tooltip';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { useOneOnOneChatting, useTypingDetection } from '@/hooks';
import { Palette } from 'lucide-react';
import { MessangerThemeDrawer } from '.';
import { cn } from '@/lib/utils';
const SendChat = ({type}) => {
  useTypingDetection()
  const dispatch = useDispatch()
  const [message, setMessage] = useState("");
  const [sedMessage, isSeding, error] = useOneOnOneChatting()

  useEffect(() => {
    dispatch(setStoreMessage(message))
  }, [message])
  const textHandler = (inputMessage) => {
    setMessage(inputMessage);

  };
  const handleEmojiClick = (emoji) => {
    setMessage(prevMessage => prevMessage + emoji);
  };
  const handleSubmit = () => {
    if (message) {
      sedMessage(message)
    }
    setMessage("")

  }
  return (
    <>
      <div className='w-screen'>
        <div className={"relative flex w-full max-w-lg  items-center mx-auto  h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2"}>
          <div className={cn(" absolute bottom-0 w-full overflow-hidden rounded-lg border border-white bg-background focus-within:ring-1 focus-within:ring-ring",type==="space"&&"bg-black")} x-chunk="dashboard-03-chunk-1">
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => textHandler(e.target.value)}
              placeholder="Type your message here..."
              className={cn(" min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0",type==="space"&&"bg-black")}
            />
            <div className="flex items-center p-3 pt-0 ">
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
              </Tooltip> */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <EmojiDialog setEmojis={handleEmojiClick}>
                    <Button variant="ghost" size="icon">
                      <SmilePlusIcon className="size-4" />
                      <span className="sr-only">Emojis</span>
                    </Button>
                  </EmojiDialog>
                </TooltipTrigger>
                <TooltipContent side="top">Emojis</TooltipContent>
              </Tooltip>
              {/* <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Mic className="size-4" />
                    <span className="sr-only">Use Microphone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
              </Tooltip> */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <MessangerThemeDrawer>
                    <Button variant="ghost" size="icon">
                      <Palette className="size-4" />
                      <span className="sr-only">Set Theme</span>
                    </Button>
                  </MessangerThemeDrawer>
                </TooltipTrigger>
                <TooltipContent side="top">Set Theme</TooltipContent>
              </Tooltip>
              <Button size="sm" onClick={handleSubmit} className="ml-auto gap-1.5 mt-2">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SendChat;
const EmojiDialog = ({ children, setEmojis }) => {
  return (
    <Dialog className="bg-transparent w-fit flex justify-center items-center">
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Select Emojis</DialogTitle>
        </DialogHeader>
        <EmojiPicker className='mx-auto' onEmojiClick={(e) => setEmojis(e.emoji)} />
      </DialogContent>
    </Dialog>
  );
};
