import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setTheme } from '@/app/slices/themeSlice'
import { MainMenubar } from '@/components'
import { Toaster } from "@/components/ui/toaster"
import {TooltipProvider} from "@/components/ui/tooltip"
import { useSelector } from 'react-redux'
import { Auth } from '@/services'
import { login,emailAuthenticated } from '@/app/slices/authSlices'
const App = () => {
  console.log("App initialized..");
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // This Dispatch fuction used to initialize Theme 🌞 🌃
  dispatch(setTheme())
  //

  useEffect(() => {
    
      const getExistingUser = async () => {
        try {
          const response = await Auth.getUser()
          if (response) dispatch(login(response?.data?.data))
          //TODO: change this code when you going to production 👇👇
          if (response?.data?.data?.emailVerified) dispatch(emailAuthenticated(response?.data?.data?.emailVerified))
        } catch (error) {
          console.log(`User not found :: ${error}`);
        }
      }
      ;(async ()=> await getExistingUser())()
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
