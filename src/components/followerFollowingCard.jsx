import { PROFILE_DUMMY_IMAGE_URL } from '@/constants';
import { Badge } from "@/components/ui/badge"
import { Avatar } from './ui/avatar';
import React, { useEffect } from 'react'
import { AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { useProfileImage } from '@/hooks';
import { useSelector } from 'react-redux';
const followerFollowingCard = ({type,entity,imageId}) => {
    const userData = useSelector((state)=>state.auth.userData)
    const [profileImageUrl, setImageId, isLoadingProfileImage, profileImageError] = useProfileImage()
    useEffect(()=>{
        if(imageId){
            setImageId(imageId)
        }
    },[imageId])
    if(userData._id===entity._id && type==='following') return<></>
    if(userData._id===entity._id && type==='followers') return<></>
    return (
        <Link to={`/profile/@${entity?.username}`}>
            <div className={`mx-10`}>
                <div className="w-fit flex space-x-4 flex-wrap">
                    <Avatar className="my-auto w-14 h-fit">
                        <AvatarImage src={profileImageUrl || PROFILE_DUMMY_IMAGE_URL} alt="@user" />
                    </Avatar> 
                    <div>
                        <div className="text-lg flex"><p className="leading-7 [&:not(:first-child)]:mt-6">{entity?.username ? entity?.username : null}</p>
                        </div>
                        <div className="text-sm flex"><p className="leading-7 [&:not(:first-child)]:mt-6">{entity?.fullName ? entity?.fullName : null}</p></div>
                        <div className='my-2 space-x-1'>
                            {entity && entity.isFollowing ? <Badge className={"bg-red-200 text-sm"}>following</Badge> : null}
                            {/* <Badge className={"bg-green-200 text-sm"}>follower</Badge> */}
                        </div>
                    </div>
                </div>
                <Separator className="my-2 w-full" />
            </div>
        </Link>
    )
}

export default followerFollowingCard