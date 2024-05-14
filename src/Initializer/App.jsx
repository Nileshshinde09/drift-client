import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login, logout } from '../app/slices/authSlices'
import { setTheme } from '@/app/slices/themeSlice'
import { MainMenubar } from '@/components'
import { Toaster } from "@/components/ui/toaster"
import {TooltipProvider} from "@/components/ui/tooltip"

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  console.log("Hello world");
  // This Dispatch fuction used to initialize Theme 🌞 🌃
  dispatch(setTheme())
  //

  useEffect(() => {
    setLoading(false)
  }, [])
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
            {/* <MainMenubar /> */}
          </div>
        </div>
      <Toaster />
      </TooltipProvider>
    </div>
    </>
  ) : null
}

export default App
