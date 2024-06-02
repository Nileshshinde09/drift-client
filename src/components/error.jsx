import React from 'react'
import { 
    ANIMATED_3D_404_NOT_FOUND_PAGE_ERROR_V1,
    SHORT_CIRCUIT_ANIMATED_500_ERROR_PAGE_V1,
    ANIMATED_TURTLE_IN_TROUBL_ERROR_PAGE_V1
 } from '@/constants'
const CustomError = ({ ErrorStatusCode }) => {
    if (String(ErrorStatusCode) === "404")
        return (
            <div className='flex justify-center items-center content-center'>
                <img src={ANIMATED_3D_404_NOT_FOUND_PAGE_ERROR_V1} className='w-full' alt="Page Not Found" />
            </div>
        )
    if (String(ErrorStatusCode) === "500")
        return (
            <div className='flex justify-center items-center content-center'>
                <img src={SHORT_CIRCUIT_ANIMATED_500_ERROR_PAGE_V1} className='w-full' alt="Page Not Found" />
            </div>
        )
    if (String(ErrorStatusCode) === "504")
        return (
            <div className='flex justify-center items-center content-center'>
                <img src={ANIMATED_TURTLE_IN_TROUBL_ERROR_PAGE_V1} className='w-full' alt="Page Not Found" />
            </div>
        )

}

export default CustomError