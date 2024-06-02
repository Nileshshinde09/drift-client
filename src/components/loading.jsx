
import React from 'react'

const loading = () => {
    return (
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Loading
            <span className='animate-pulse [animation-delay:-0.3s]'>.</span>
            <span className='animate-pulse [animation-delay:-0.15s]'>.</span>
            <span className='animate-pulse [animation-delay:-0.30s]'>.</span>
            <span className='animate-pulse [animation-delay:-0.45s]'>.</span>

        </h1>
    )
}

export  { loading }