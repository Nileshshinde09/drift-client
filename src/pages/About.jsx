import { Accord } from '@/components'
import React from 'react'
import { TEAM } from '@/constants'
import { Copyright } from '@/components'
const About = () => {
  const teamEntries = Object.entries(TEAM);

  return (
    <div className='no-scrollbar w-full space-y-3 mx-auto px-5 sm:px-10 md:px-20 py-5 h-screen overflow-y-scroll'>
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ABOUT @DriftSocial
      </h1>
      <p className="text-xl text-muted-foreground text-center tracking-tight">
        Welcome to Drift Social, a unique platform designed to provide a secure and anonymous social media experience. Our mission is to create a digital space where users can freely express themselves, connect with others, and share experiences without the fear of losing their privacy.
      </p>
      <p className="text-xl text-muted-foreground tracking-tight">
        Drift Social was founded on the belief that everyone deserves a place where they can be their authentic selves, engage in meaningful conversations, and build genuine connections. We understand the challenges and pressures associated with traditional social media platforms, and we aim to offer a refreshing alternative.
      </p>
      <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Our Team
      </h2>
      {
        teamEntries.map(([name, description]) => {
          return (
            <>
              <Accord question={name}>
                {
                  description
                }
              </Accord>
            </>
          )
        })
      }
      <p className="text-xl text-muted-foreground tracking-tight">
        Together, our team is committed to delivering a social media platform that prioritizes user privacy, security, and freedom of expression. We continuously work on improving Drift Social by incorporating user feedback and staying abreast of the latest technological advancements.
      </p>
      <p className="text-xl text-muted-foreground tracking-tight">
        Thank you for choosing Drift Social. We are excited to have you as part of our community and look forward to seeing the connections and conversations that will flourish here.
      </p>
      <div className='flex justify-center'><Copyright/></div>
    </div>
  )
}

export default About