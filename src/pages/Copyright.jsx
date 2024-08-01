import React from 'react'
import { Copyright } from '@/components'
import { useDocumentTitle } from 'usehooks-ts'
const copyright = () => {
  useDocumentTitle("Copyright💎Drift")
  return (
    <div className='no-scrollbar w-full space-y-3 mx-auto px-5 sm:px-10 md:px-20 py-5 h-screen overflow-y-scroll'>
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        COPYRIGHT @DriftSocial
      </h1>
      <div className='flex justify-center'><Copyright/></div>
      <p className="leading-7 [&:not(:first-child)]:mt-6">This website and its content, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, digital downloads, data compilations, and software, are the property of Drift Social or its content suppliers and protected by international copyright laws.</p>
      <p className="leading-7 [&:not(:first-child)]:mt-6">The compilation of all content on this site is the exclusive property of Drift Social and protected by international copyright laws. All software used on this site is the property of Drift Social or its software suppliers and protected by international copyright laws.</p>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      Unauthorized Use:
    </h4>
    <p className="leading-7 [&:not(:first-child)]:mt-6">Any unauthorized use, including but not limited to the reproduction, distribution, display, or transmission of the content of this site is strictly prohibited, unless authorized by Drift Social. You may not, except with our express written permission, distribute or commercially exploit the content. Nor may you transmit it or store it in any other website or other forms of electronic retrieval systems.</p>
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
    Trademarks:
    </h4>
    <p className="leading-7 [&:not(:first-child)]:mt-6">Drift Social and other marks indicated on our site are trademarks or registered trademarks of Drift Social in the Indias and/or other jurisdictions. Drift Social’s trademarks and trade dress may not be used in connection with any product or service that is not Drift Social’s, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits Drift Social. All other trademarks not owned by Drift Social that appear on this site are the property of their respective owners, who may or may not be affiliated with, connected to, or sponsored by Drift Social.</p>
    <h4 className="text-center scroll-m-20 text-xl font-semibold tracking-tight">For permissions and licensing inquiries, please contact us at trydriftsocial@gmail.com</h4>
    <h4 className="text-center scroll-m-20 text-xl font-semibold tracking-tight">Thank you for respecting our intellectual property.</h4>
    </div>
  )
}

export default copyright