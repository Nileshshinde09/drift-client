import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Separator } from "@/components/ui/separator"
import { Find } from "@/services";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { Label } from "@radix-ui/react-label";
import { useDebounce } from 'use-debounce';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const FindUsers = () => {
    const [userList, setUserList] = useState([])
    const [userInput, setUserInput] = useState(null)
    const debouncedUserInput = useDebounce(userInput, 100);
    const [findUserErrorMessage, setFindUserErrorMessage] = useState(null);
    const  navigate = useNavigate()
    useEffect(() => {
        const findUserByUsename = async () => {
            if (debouncedUserInput[0]) {
                try {
                    const response = await axios.get(
                        `/api/v1/find/find-user/?username=${debouncedUserInput[0]}`
                    );
                    if (response.data)
                        setUserList(response.data.data.users)

                } catch (error) {
                    const axiosError = error;
                    setFindUserErrorMessage(
                        axiosError.response?.data.message ?? 'Error checking User'
                    );
                }
            }
        };
        setUserList([])
            ; (async () => await findUserByUsename())()
    }, [debouncedUserInput[0]]);

    return (
        <Form>
            <form>
                <div className="text-center space-y-2 md:text-3xl xl:text-4xl">
                    <Label htmlFor="findInput">
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            Find people's
                        </h2>
                    </Label>
                    <Input id="findInput" onChange={(e) => { setUserInput(e.target.value) }} placeholder="🔍Enter Username" />
                    <ScrollArea className={`${userList.length <= 0 ? "hidden" : null} h-fit w-full rounded-md border overflow-y-scroll no-scrollbar`}>
                        {
                            userList && userList?.map((user, index) => {

                                return (
                                    <>
                                        {/* <div>
                                            <Avatar url={user.Avatar} username={user?.username} fullName={user.fullName} />
                                            <Separator className="my-2" />
                                        </div> */}
                                        <div key={index} className="flex justify-start items-center m-2 w-full mx-auto">
                                            <Avatar className="mx-2">
                                                <AvatarImage src={user?.Avatar || "https://github.com/shadcn.png"} alt="@shadcn" />
                                                <AvatarFallback>{user?.username}</AvatarFallback>
                                            </Avatar>
                                            {/* <Button className="mx-2" onClick={() => navigate(`/profile/${user._id}`)}>Visit</Button> */}
                                            <Button type="button" className="mx-2" onClick={() => navigate(`/profile/@${user.username}`)}>Visit</Button>

                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger className="text-center">
                                                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                                            {
                                                                user?.username
                                                            }
                                                        </h4>
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        {
                                                            <>
                                                                <p className="leading-3 [&:not(:first-child)]:mt-6 ">
                                                                    {
                                                                        user?.fullName
                                                                    }
                                                                </p>
                                                                <p className="leading-3 [&:not(:first-child)]:mt-6 ">
                                                                    {
                                                                        user?.email
                                                                    }
                                                                </p>
                                                            </>
                                                        }
                                                   </AccordionContent>
                                                </AccordionItem> 
                                            </Accordion>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </ScrollArea>
                    <>
                        <h1 className={`${userList.length > 0 ? "hidden" : null} scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`}>
                            {findUserErrorMessage ? findUserErrorMessage : null}
                        </h1>
                    </>
                </div>
            </form>
        </Form>
    )
}
export default FindUsers;