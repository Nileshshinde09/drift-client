
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { DrawerTrigger } from "@/components/ui/drawer"
import { FriendRequestSheet, MakeFriendRequest, Share } from '@/components'
import { VITE_HOST_URL } from '@/constants'
import { User2, Image, Video, GroupIcon, ContactRoundIcon, PhoneCall, Share2, Cake, SquarePlus, Smartphone, PersonStanding, BookMarked, UserCheck2, UserPlus2, Settings2, Eye, EyeOff, Flag } from 'lucide-react'
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { AvatarImage } from '@/components/ui/avatar'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { setBookMark, removeBookMark } from '@/app/slices/bookmarkedSlice'
import { useDocumentTitle, useFollowUnfollow, useProfile, useProfileImage } from '@/hooks'
import { FollowerFollowingSheetLayout, CardLayout, ProfileCardText, BookMarkedDrawer } from '@/components'
import { Loading, CustomError } from '@/components'
import { setIds } from '@/app/slices/callSlice'
import { Button } from '@/components/ui/button'
import { Friends } from '@/services'
import { useToast } from '@/components/ui/use-toast'
const Profile = () => {
    const path = useLocation()
    const {toast} = useToast()
    const { username } = useParams();
    useDocumentTitle(`@${username.replace("@", "")} 💎Drift`)
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existingUser = useSelector(state => state.auth.userData)
    const [isExistingUserProfile, setIsExistingUserProfile] = useState(false)
    const [profileImageUrl, setImageId, isLoadingProfileImage, profileImageError] = useProfileImage()
    const [profileData, profileError, isLoadingOfProfile, setUsernameForProfile] = useProfile()
    const [isVisible, setIsVisible] = useState(false)
    const [followState, followUnfollowError, isLoading, followUnfollow] = useFollowUnfollow(username?.replace("@", ''))
    const [isRequested, setIsRequested] = useState(false)
    const [isFriends, setIsFriends] = useState(false)
    useEffect(() => {
        if (username && existingUser) {
            setIsOwnProfile(username.replace("@", "") === existingUser?.username)
        }
    }, [username, existingUser])

    const changeVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleFollowButtonClick = () => {
        if (username) {
            followUnfollow()
        }
    }
    useEffect(() => {
        if (!profileData || isOwnProfile) return;
        (async () => {
            try {
                const friends = await Friends.checkIsFriends(profileData._id)
                if (friends?.data) {
                    if (friends?.data.data.status) {
                        setIsFriends(friends?.data.data)
                    }
                }
            } catch (error) {
                console.error("Failed to fetch friends:", error.message);
            }
        })();
    }, [profileData, isOwnProfile]);
    useEffect(() => {
        if (!username || !existingUser?.username) return;
        setUsernameForProfile(username.replace("@", ''))
        setIsExistingUserProfile(username.replace("@", '') === existingUser?.username)

        dispatch(setIds({
            callerId: existingUser._id,
            receiverId: profileData?._id
        }))
    }, [username, existingUser])

    useEffect(() => {
        if (!profileData) return;
        setImageId(profileData.avatar)
        if (profileData.BookmarkedPosts) {
            dispatch(setBookMark({ bookmarkData: profileData.BookmarkedPosts }))
        }
    }, [profileData, username])

    if (isLoadingOfProfile) return <Loading />
    if (profileError) return <CustomError ErrorStatusCode={"500"} />

    const handleCreateGroupNavigation = () => {
        const createGroup = true;
        navigate(`/messanger/group-chat/${existingUser?._id}/${createGroup}`)
    }
    const handleFriendRequest = async () => {
        if (!profileData) return;
        const response = await Friends.makeOrRetrieveRequest(profileData._id);
        if (response.data) {
            if (response.data.data.requested) {
                setIsRequested(true)
            } else {
                setIsRequested(false)
            }
        }
    }
    const handleUnFriend = async () => {
        if (!isFriends) return;
        const response = await Friends.removeFriend(isFriends?._id);
        if (response) {
            if(response?.data?.data?.isRemoved){
                setIsRequested(false)
                setIsFriends(false)
                toast({
                    title:"User Unfriend Successfully!"
                })
            }
        }
    }

    return (
        <Card className={`sm:-mt-16 -mt-10 sm:w-[700px] mx-auto relative ${isVisible ? "bg-transparent" : ""}`}>
            <CardHeader className="text-center">
                {isVisible ? <Eye className='cursor-pointer' onClick={changeVisibility} /> : <EyeOff className='cursor-pointer' onClick={changeVisibility} />}
                <div className='absolute right-6 cursor-pointer'>
                    <Share className="hover:cursor-pointer" url={VITE_HOST_URL + path.pathname} username={username}>
                        <Share2 />
                    </Share>
                </div>
                <CardTitle className="hover:scale-110 transition-transform">{`${username || "@Drift"}`}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap space-y-3 max-sm:overflow-y-scroll max-sm:h-screen max-sm:pb-[20rem]">
                <CardLayout>
                    <div className="flex-1 space-y-1">
                        <Avatar className="w-32 h-fit">
                            <AvatarImage src={profileImageUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </CardLayout>
                <CardLayout>
                    <ProfileCardText value={username} altValue='Username'><User2 /></ProfileCardText>
                    <ProfileCardText value={profileData?.fullName || ""} altValue='FullName'><User2 /></ProfileCardText>
                    <ProfileCardText value={profileData?.gender || ""} altValue='Gender'><PersonStanding /></ProfileCardText>
                </CardLayout>
                <CardLayout>
                    <ProfileCardText value={profileData?.dob?.split('T')[0] || ""} altValue='DOB'><Cake /></ProfileCardText>
                    <ProfileCardText value={profileData?.status || "Active"} altValue='Status'><Smartphone /></ProfileCardText>
                    <ProfileCardText value={String(profileData?.bookmarkCount) || '0'} altValue='Book Marked'><BookMarked /></ProfileCardText>
                </CardLayout>
                {profileData && profileData?.bio &&
                    <CardLayout>
                        <ProfileCardText value={profileData.bio || ""} altValue='Bio'></ProfileCardText>
                    </CardLayout>
                }
                {!isExistingUserProfile && !isOwnProfile &&
                    <CardLayout>
                        <ProfileCardText onButtonClick={handleFollowButtonClick} cardType="button" value={`${followState ? "Unfollow" : "Follow"}`}>{followState ? <UserCheck2 /> : <UserPlus2 />}</ProfileCardText>
                    </CardLayout>
                }
                <CardLayout>
                    <FollowerFollowingSheetLayout username={username.replace('@', '')} side={"left"} type={"followers"}>
                        <ProfileCardText cardType="button" value={String(profileData?.followersCount) || '0'} altValue='' className={"bg-red-200"}>Followers</ProfileCardText>
                    </FollowerFollowingSheetLayout>
                </CardLayout>
                <CardLayout>
                    <FollowerFollowingSheetLayout username={username.replace('@', '')} side={"right"} type={"following"}>
                        <ProfileCardText cardType="button" value={String(profileData?.followeesCount) || '0'} altValue='' className={"bg-green-200"}>Following</ProfileCardText>
                    </FollowerFollowingSheetLayout>
                </CardLayout>
                {!isOwnProfile &&
                    <CardLayout>
                        {!isFriends ?
                            <>
                                {!isRequested ?
                                    <Button onClick={() => handleFriendRequest()}>Send Request</Button> :
                                    <Button onClick={() => handleFriendRequest()}>Retrieve Request</Button>
                                }
                            </> :
                            <Button onClick={() => handleUnFriend()}>UnFriend</Button>
                        }
                    </CardLayout>}

                {isOwnProfile &&
                    <>
                        <CardLayout>
                            <BookMarkedDrawer>
                                <ProfileCardText cardType="button" value={"Book Marked"} altValue='bookmarked' className={"bg-slate-200"}><BookMarked /></ProfileCardText>
                            </BookMarkedDrawer>
                        </CardLayout>
                        <CardLayout>
                            <DrawerTrigger>
                                <ProfileCardText cardType="button" value={"Settings"} altValue='settings' className={"bg-slate-200"}><Settings2 /></ProfileCardText>
                            </DrawerTrigger>
                        </CardLayout>
                        <CardLayout>
                            <ProfileCardText route={'/create-post'} cardType="link" value={"Create Post"} altValue='create post' className={"bg-slate-200"}><SquarePlus /></ProfileCardText>
                        </CardLayout>
                        <CardLayout>
                            <ProfileCardText route={`/individual-post/${existingUser?.username}`} cardType="link" value={"Posts"} altValue='Posts' className={"bg-slate-200"}><Image /></ProfileCardText>
                        </CardLayout>
                        {/* <CardLayout>
                            <ProfileCardText cardType="video-call-button" value={"Video Call"} altValue='video call' className={"bg-slate-200"}><Video /></ProfileCardText>
                        </CardLayout>
                        <CardLayout>
                            <ProfileCardText cardType="voice-call-button" value={"Voice Call"} altValue='voice call' className={"bg-slate-200"}><PhoneCall /></ProfileCardText>
                        </CardLayout> */}
                        <CardLayout>
                            <ProfileCardText onButtonClick={handleCreateGroupNavigation} cardType="create-public-group" value={"Create Groups"} altValue='public groups' className={"bg-slate-200"}><GroupIcon /></ProfileCardText>
                        </CardLayout>
                        <CardLayout>
                            <FriendRequestSheet>Friend Request</FriendRequestSheet>
                        </CardLayout>
                        <CardLayout>
                            <ProfileCardText cardType="friendList" value={"Friends"} altValue='Friends' className={"bg-slate-200"}><ContactRoundIcon /></ProfileCardText>
                        </CardLayout>
                        {/* <CardLayout>
                            <ProfileCardText cardType="chat-with-friend" value={"Chat"} altValue='public groups' className={"bg-slate-200"}><GroupIcon /></ProfileCardText>
                        </CardLayout> */}
                        {/* <CardLayout>
                            <ProfileCardText cardType="group-chat-with-friends" value={"Group Chat With Friends"} altValue='public groups' className={"bg-slate-200"}><GroupIcon /></ProfileCardText>
                        </CardLayout> */}
                        {/* <CardLayout>
                            <DrawerTrigger>
                                <ProfileCardText cardType="button" value={"Make Friend Request"} altValue='friend' className={"bg-slate-200"}><Settings2 /></ProfileCardText>
                            </DrawerTrigger>
                        </CardLayout> */}
                    </>
                }
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default Profile
