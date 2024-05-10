import React from 'react'
import driftLogo from "@/assets/Applogo/driftLogo.png"
import { BackgroundAnimation } from '@/components'

const AuthLayout = ({ children }) => {
    return (
        <>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen overflow-scroll no-scrollbar">
                <BackgroundAnimation />
                <div className="sm:block my-auto">
                    <img className="sm:animate-bounce sm:[animation-duration:3s] drop-shadow-2xl max-w-[30rem] max-sm:w-[15rem] mx-auto" alt="image" src={driftLogo} >
                    </img>
                    <div className='flex justify-center space-x-4 mt-2 drop-shadow-2xl scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                        <div className='sm:animate-bounce [animation-delay:-0.3s] [animation-duration:2s]'>Drift</div>
                        <div className='sm:animate-bounce [animation-delay:-0.15s] [animation-duration:2s]'>Social</div>
                    </div>
                </div>
                <div className="flex items-center justify-center py-12  sm:drop-shadow-2xl">
                    <div className="mx-auto grid w-[350px] gap-6 ">
                        <>
                            {children}
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout