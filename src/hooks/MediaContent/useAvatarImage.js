import { useDispatch, useSelector } from "react-redux"
import { setProfileImage } from "@/app/slices/authSlices"
import { useEffect, useState } from "react"
import { Profile } from "@/services"
const useAvatarImage = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [avatarError, setAvatarError] = useState(null)
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                if (id) {
                    setIsLoading(true)
                    const response = await Profile.getProfileImageById(id);
                    if (!response) throw new Error("No response from server");
                    const profileImageUrl = response?.data?.data?.response?.URL
                    if (profileImageUrl)
                        dispatch(setProfileImage({
                            profileImageUrl
                        }));
                    }  
                    setIsLoading(false)   
            } catch (error) {
                setIsLoading(false)
                setAvatarError(error.message)   
                console.error(error.message);
            }
        };
        fetchProfileImage();

    }, [id, dispatch]);
    return [avatarError, setId,isLoading]
}

export { useAvatarImage }