import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from './ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const JjParticipantLayout = ({ JJData = [] }) => { // Default JJData to an empty array
  const userData = useSelector(state => state.auth.userData);
  const navigate = useNavigate();

  const removeDuplicateUsers = (userList) => {
    const uniqueUsersMap = new Map();

    userList.forEach(user => {

      if (user?.username !== userData?.username) {
        uniqueUsersMap.set(user?.username, {
          _id: user._id,
          username: user?.username,
          userAvatar: user.userAvatar
        });
      }
    });

    return Array.from(uniqueUsersMap.values());
  };

  const uniqueUsers = removeDuplicateUsers(JJData);
  return (
    <div className='mx-auto w-20 h-[80%] absolute overflow-scroll no-scrollbar left-20 border-spacing-2 border-double border-white border-2 rounded-2xl mt-20 '>
      {userData && JJData.some(user => user?.username === userData?.username) && (
        <div className='cursor-pointer' onClick={() => navigate(`/journeyjournals/${userData?.username}`)}>
          <Avatar className="hover:scale-110 transition-transform m-2 mx-auto shadow-2xl shadow-slate-100">
            <AvatarImage src={userData.userAvatar || "https://github.com/shadcn.png"} alt={`@${userData?.username}`} />
            <AvatarFallback>{userData?.username}</AvatarFallback>
          </Avatar>
          <h1 className='text-center'>{userData?.username}</h1>
          <Separator className="w-16 mx-auto bg-white" />
        </div>
      )}
      {uniqueUsers.map((val) => 
      {
        return(
        <div key={val._id} className='cursor-pointer' onClick={() => navigate(`/journeyjournals/${val?.username}`)}>
          <Avatar className="hover:scale-110 transition-transform m-2 mx-auto shadow-2xl shadow-slate-100">
            <AvatarImage src={val.userAvatar || "https://github.com/shadcn.png"} alt={`@${val?.username}`} />
            <AvatarFallback>{val?.username}</AvatarFallback>
          </Avatar>
          <h1 className='text-center'>{val?.username}</h1>
          <Separator className="w-16 mx-auto bg-white" />
        </div>
      )})}
    </div>
  );
};

export default JjParticipantLayout;
