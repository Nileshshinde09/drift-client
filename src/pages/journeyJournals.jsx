import { DeleteJJdialog, JjParticipantLayout, UpdateJJdialog } from '@/components'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AudioLines, Trash2, User2 } from 'lucide-react';
import { Space } from '@/services';
import { useInitializeSpace } from '@/hooks';
import { Badge } from '@/components/ui/badge';
import { useSelector } from 'react-redux';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
const JourneyJournals = () => {
  const userData = useSelector(state => state.auth.userData)
  const [setRecieverId] = useInitializeSpace()
  const { username } = useParams();
  const [toggle, setToggle] = useState(false)
  const [jJList, setJJList] = useState([]);
  const navigate = useNavigate();
  // const { toast } = useToast()
  useEffect(() => {
    (async () => {
      try {
        const response = await Space.getJJUserFeed();
        if (response.data && response.data.data) {
          setJJList(response.data.data.feedPost);
        } else {
          setJJList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setJJList([]);
      }
    })();
  }, [username, toggle]);

  useEffect(() => {
    if (!username || !jJList) return;
    setJJList(jJList.map((val) => {
      if (val?.username === username) return val
    }))
  }, [username])
  const spaceHandler = (val) => {
    // if(userData._id===val.userId){
    //   navigate(`/messanger/space/${val._id}`)
    // }
    let toggle=false;
    val?.members?.forEach((member)=>{
      if(member===userData._id) toggle=true;
    })
    if(!toggle){
      toast( "You are not part of this Ano Group", {  
        description: "To join the group , Request Admin to make participant.",
        action: {
          label: "Ask",
          onClick: () =>{
            navigate(`/messanger/chat/${val?.userId}`)},
        },
        duration:60*1000,
        closeButton:true
      });
    }else{
      navigate(`/messanger/space/${val._id}`)
    }
  }

  const postHandler = (username) => {
    if (userData?.username === username) {

    }
    navigate(`/profile/@${val?.username}`)
  }

  const deleteJJHandler = async (Id) => {
    const respose = await Space.deletePostAndSpace(Id)
  }
  console.log(jJList);

  return (
    <div className='bg-black flex justify-center space-x-4 mx-auto w-screen h-screen absolute'>
      <h2 className="absolute scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {username && username ? `@${username && username === userData?.username ? "Your" : username} Journey Journals` : "Journey Journals Feed"}
      </h2>
      {/* <JjParticipantLayout JJData={jJList} /> */}
      <div className='h-[85%] overflow-y-scroll no-scrollbar mt-14 sm:w-[60%] w-full rounded-2xl border-spacing-2 border-double border-white border-2'>
        {jJList.length > 0 ? jJList.map((val) => (
          <Card key={val._id} className="sm:w-1/2 w-[95%] mx-auto my-2 bg-white hover:scale-105 transition-transform shadow-sm shadow-white text-black relative">
            <AudioLines onClick={() => spaceHandler(val)} className='absolute m-5 hover:scale-110 transition-transform cursor-pointer' />
            {val?.username === userData?.username ?
              <>
                <  DeleteJJdialog setToggle={setToggle} toggle={toggle} data={val}><Trash2 onClick={() => deleteJJHandler(val._id)} className='absolute right-14 m-1 stroke-red-400 hover:scale-110 transition-transform cursor-pointer' /></DeleteJJdialog>
                <UpdateJJdialog setToggle={setToggle} toggle={toggle} data={val}>
                  <Badge className='absolute right-0 m-1 bg-black text-white hover:bg-black hover:text-white hover:scale-110 transition-transform cursor-pointer'>{val?.username === userData?.username ? "edit" : val?.username || "Not found"}</Badge>
                </UpdateJJdialog>
              </>
              :
              <Badge onClick={() => postHandler(val?.username)} className='absolute right-0 m-1 bg-black text-white hover:bg-black hover:text-white hover:scale-110 transition-transform cursor-pointer'>{val?.username === userData?.username ? "your" : val?.username || "Not found"}</Badge>}
            <CardHeader>
              <CardTitle className="text-center">{val.topic || "Topic name"}</CardTitle>
            </CardHeader>
            <CardContent >
              {val.content || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non similique sapiente quos. Quisquam aspernatur sunt sit maiores laborum magnam corrupti?"}
            </CardContent>
          </Card>
        )) : <div className='text-center text-white'>No Post Found!</div>}
      </div>
    </div>
  );
}

export default JourneyJournals;
