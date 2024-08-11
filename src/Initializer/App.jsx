import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { setIsMuteNotifications, setMessangerNotificationSoundTheme, setTheme } from '@/app/slices/themeSlice'
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useExistingUser, useNotifications } from '@/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, disconnectSocket } from '@/app/slices/socketSlice'
import { Toaster as SonnarToaster } from "@/components/ui/sonner"
import { MainMenubar } from '@/components'

const App = () => {
  const [loading, data] = useExistingUser()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state)=>state.auth.status)
  useEffect(() => {
    dispatch(setTheme())
    dispatch(setIsMuteNotifications())
    dispatch(setIsMuteNotifications())
    dispatch(setMessangerNotificationSoundTheme())
    dispatch(connectSocket());
    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useNotifications()
  
  return !loading ? (
    <>
      <div className='h-screen overflow-hidden'>
        <TooltipProvider>
          <div className='relative'>
            <main>
              <Outlet />
            </main>
          </div>
          <div className='absolute inset-x-0 bottom-0 flex justify-center m-10'>
            <div className='pointer-events-auto'>
              {useLocation().pathname.split('/')[1] === 'call' ?
                <MainMenubar />
                : null
              }
            </div>
          </div>
          <Toaster />
          <SonnarToaster />
        </TooltipProvider>
      </div>
    </>
  ) : null
}

export default App
