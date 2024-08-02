import React from 'react'
import { FindUsers } from '@/components'
import { useSelector } from 'react-redux'
import { useDocumentTitle } from 'usehooks-ts'
const findPeoples = () => {
  const user=useSelector(state=>state.auth.userData)
  useDocumentTitle(`${user?.username} finding peoples 💎Drift`)
  return (
    <div className='mx-auto w-[30rem]'>
      <FindUsers/>
    </div>
  )
}

export default findPeoples
