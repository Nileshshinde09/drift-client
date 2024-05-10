import React from 'react'

const bouncingBall = (
    {
        className="",
        size=4,
        color=""
    }   
    ) => {
    return (
        <div>
            <div className={`flex space-x-2 justify-center items-center dark:invert ${className}`}>
                <div className={`h-${size?size:4} w-${size?size:4} ${!color?"bg-black":color} rounded-full animate-bounce [animation-delay:-0.3s]`}></div>
                <div className={`h-${size?size:4} w-${size?size:4} ${!color?"bg-black":color} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
                <div className={`h-${size?size:4} w-${size?size:4} ${!color?"bg-black":color} rounded-full animate-bounce [animation-delay:-0.30s]`}></div>
                <div className={`h-${size?size:4} w-${size?size:4} ${!color?"bg-black":color} rounded-full animate-bounce [animation-delay:-0.45s]`}></div>
            </div>
        </div>
    )
}

export default bouncingBall
