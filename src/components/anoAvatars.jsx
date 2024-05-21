import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useToast } from './ui/use-toast'
import { Avatar } from '.'
import { Check } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setAvatar } from '@/app/slices/updateProfile';
const avatarProps = {
    fullName: null,
    username: null,
}
const AvatarComponent = ({ avatar, isSelected, onSelect }) => {
    return (
        <div onClick={() => onSelect(avatar._id)} className="my-5 relative cursor-pointer">
            {isSelected && <Check className='absolute bg-sky-500 rounded-full' />}
            <Avatar {...avatarProps} url={avatar.URL} />
        </div>
    );
};
const anoAvatarsCollection = () => {
    const dispatch = useDispatch()
    const { toast } = useToast();
    const [anoAvatars, setAnoAvatars] = useState([])
    const [selectedImage, setSelectedImage] = useState(null)
    useEffect(() => {
        ; (async () => {
            try {
                const response = await axios.get("/api/v1/fileloader/load-ano-assets",
                    {
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                        }
                    }
                )
                if (response.data) {
                    setAnoAvatars(response.data.data);
                }
            } catch (error) {
                toast({
                    title: "Error !!",
                    description: error.message || null,
                    variant: "destructive"
                })
            }
        })()
    }, [selectedImage])

    const imageSelecter = (id) => {
        if (id) {
            setSelectedImage(id)
            dispatch(
                setAvatar({
                isImageUploaded: false,
                imageId: id,
                fileData: null,
                })
            )
            toast({
                title: "Avatar Selected !!",
            })
        }
    }
    return (
        <>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Select Image
            </h3>
            <div className="flex justify-center items-center w-[800px]">
                <div className="flex justify-center flex-wrap w-full">
                    {anoAvatars && anoAvatars.length > 0 ? (
                        anoAvatars.map((avt) => {
                            return (
                                <AvatarComponent key={avt._id} avatar={avt} isSelected={avt._id === selectedImage} onSelect={imageSelecter} />
                            );
                        })
                    ) : null}
                </div>
            </div>
        </>

    )
}

export default anoAvatarsCollection
