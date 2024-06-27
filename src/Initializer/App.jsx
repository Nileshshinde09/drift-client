import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { setTheme } from '@/app/slices/themeSlice'
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useExistingUser, useNotifications } from '@/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { connectSocket, disconnectSocket } from '@/app/slices/socketSlice'
import { Toaster as SonnarToaster } from "@/components/ui/sonner"
import { MainMenubar } from '@/components'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTheme())
    dispatch(connectSocket());
    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  useNotifications()

  const [loading, data] = useExistingUser()

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
