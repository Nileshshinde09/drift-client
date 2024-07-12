import React from 'react'
import { MessangerContextMenue } from '.'

const Message = ({ payload, type = 'r' }) => {
    const deleteMessageHandler = () => {

    }
    return (
        <>
            {type === 'y' ?
                <>
                    <div className='w-full flex justify-end transition-transform'>
                        <MessangerContextMenue>
                            <div className='py-3 px-4 rounded-3xl bg-gray-100 text-black'>
                                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                                    {
                                        payload
                                    }
                                </h4>
                            </div>
                        </MessangerContextMenue>
                    </div>
                </> :
                <>
                    <div className='w-full flex justify-start transition-transform'>
                        <MessangerContextMenue>
                            <div className='py-3 px-4 rounded-3xl bg-white text-black'>
                                <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                                    {
                                        payload
                                    }
                                </h4>
                            </div>
                        </MessangerContextMenue>
                    </div>
                </>

            }
        </>
    )
}

export default Message
