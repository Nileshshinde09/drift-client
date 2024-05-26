import { useDispatch, useSelector } from "react-redux"
import { setProfileImage } from "@/app/slices/authSlices"
import { useEffect, useState } from "react"
import { Profile } from "@/services"
const useAvatarImage = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(null)
    const [avatarError, setAvatarError] = useState(null)
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                if (id) {
                    const response = await Profile.getProfileImageById(id);
                    if (!response) throw new Error("No response from server");
                    const profileImageUrl = response?.data?.data?.response?.URL
                    if (profileImageUrl)
                        dispatch(setProfileImage({
                            profileImageUrl
                        }));
                    }     
            } catch (error) {
                setAvatarError(error.message)   
                console.error(error.message);
            }
        };

        fetchProfileImage();
    }, [id, dispatch]);
    return [avatarError, setId]
}

export { useAvatarImage }