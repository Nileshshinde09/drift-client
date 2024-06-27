import React from 'react'
import { useParams } from 'react-router-dom'
import { CardLayout } from '@/components'
import fs from "fs";
const ringtones = () => {
  const {genre} = useParams()
  
  return (
    <div className='flex flex-wrap justify-between'>
      <CardLayout>
        
      </CardLayout>
    </div>
  )
}

export default ringtones