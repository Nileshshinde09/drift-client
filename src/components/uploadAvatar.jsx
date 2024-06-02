import React from 'react'
import { useDispatch } from 'react-redux';
import { setAvatar } from '@/app/slices/updateProfile';
const uploadAvatar = () => {
    const dispatch = useDispatch()
    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0]
        console.log(selectedFile);
        if (selectedFile)
            dispatch(
                setAvatar({
                    isImageUploaded: true,
                    imageId: null,
                    fileData: selectedFile  
                })
            )

    };
    return (
        <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Upload Profile Image
            </h3>
            <label className="block">
                <input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png" className="block w-full text-sm text-gray-500
                file:me-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                file:disabled:opacity-50 file:disabled:pointer-events-none
                dark:text-neutral-500
                dark:file:bg-blue-500
                dark:hover:file:bg-blue-400"/>
            </label>
        </div>
    )
}

export default uploadAvatar
