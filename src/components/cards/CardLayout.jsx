import React from 'react'

const CardLayout = ({ children, className, props }) => {
  return (
    <div {...props} className={`hover:scale-110 
    transition-transform
      w-fit mx-auto 
     items-center text-center space-x-4 
     rounded-md border
      ${className} p-4`}>
        <div/>
      {children}
    </div>
  )
}

export default CardLayout