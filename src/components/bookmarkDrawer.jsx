import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    Drawer,
    DrawerTrigger
} from "@/components/ui/drawer"
import React from 'react'
import { BookmarkCard, CardLayout } from "."
import { Card, CardContent } from "./ui/card"

const BookMarkedDrawer = ({ children }) => {
    const bookmarkPosts = useSelector(state => state.bookmark.bookmarkData)
    return (
        <>
            <Drawer>
                <DrawerTrigger>
                    {children}
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm text-center h-screen">
                        <DrawerHeader>
                            <DrawerTitle className="text-center">
                                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                    BookMarked
                                </h2>
                            </DrawerTitle>
                        </DrawerHeader>
                        {bookmarkPosts ?
                            <div className={`w-[500px] mx-auto relative`}>
                                <div className="space-y-3">
                                    <div />
                                        {bookmarkPosts && bookmarkPosts?.map((post) => {
                                            return <BookmarkCard key={post._id} post={post[0]} />
                                        })}
                                </div>
                            </div>
                            :
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                No BookMarks
                            </h1>
                        }
                        <DrawerFooter>
                            <DrawerClose >
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default BookMarkedDrawer
