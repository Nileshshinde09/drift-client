import React, { useState } from 'react'
import { CardLayout, MessangerNotification, MusicGenerSheet } from '@/components'
import { Music2Icon, MenuIcon } from 'lucide-react'
import { loadedImages, loadedAudiosProfessional,loadedAudiosBirthday,loadedAudiosBollywood,loadedAudiosJarvis,loadedAudiosRap } from '@/assets/notification_assets'
import { AUDIO_LIBRARY_THEME } from '@/constants'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from 'usehooks-ts'

const Ringtones = () => {
  useDocumentTitle("Music Library 💎Drift")
  const listOfAudio={
    "Professional":loadedAudiosProfessional,
    "Birthday":loadedAudiosBirthday,
    "Bollywood":loadedAudiosBollywood,
    "Jarvis":loadedAudiosJarvis,
    "Rap":loadedAudiosRap
  }
  const [gener, setGener] = useState(Object.keys(listOfAudio)[0])
  const getRandomImage = () => {
    const keys = Object.keys(loadedImages)
    const randomIndex = Math.floor(Math.random() * keys.length)
    return keys[randomIndex]
  }
  return (
    <>
      <h2 className="text-center -mt-20 flex mx-20 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        <Music2Icon className='mx-auto' /> Drift Audio Library <Music2Icon className='mx-auto' />
      </h2>
      <h3 className="flex justify-center items-center text-center scroll-m-20 text-2xl font-semibold tracking-tight">
      #{gener}<MusicGenerSheet generData={listOfAudio} setGener={setGener}><Button className=" bg-black mx-4 w-full mt-2 text-white hover:bg-black hover:scale-110 transition-transform">Explore</Button></MusicGenerSheet>
    </h3>
      <div className='flex w-full justify-center space-x-5 space-y-5 mx-[5rem] flex-wrap h-screen pb-[20rem] overflow-y-scroll'>
        <div />
        {Object.keys(listOfAudio[gener]).map((key) => (
          <CardLayout
            key={key}
            className={cn("border-2 border-spacing-2 relative", AUDIO_LIBRARY_THEME[Math.floor(Math.random() * AUDIO_LIBRARY_THEME.length)])}
          >
            <div className='w-[15rem] h-auto'>
              <img
                className='animate-spin [animation-duration:10s] opacity-80'
                src={loadedImages[getRandomImage()]}
                alt="Audio Thumbnail"
              />
              <audio
                className="mt-2 w-full"
                controls
                src={listOfAudio[gener][key]}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="text-lg font-semibold absolute top-1">{key.split('/')[2]}</div>
            <MessangerNotification music={listOfAudio[gener][key]}><MenuIcon className='absolute scale-125 right-4 top-4 cursor-pointer' onClick={()=>console.log("hello")} stroke='black' /></MessangerNotification>
          </CardLayout>
        ))}
      </div>
    </>
  )
}

export default Ringtones
