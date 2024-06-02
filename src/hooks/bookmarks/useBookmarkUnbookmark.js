import { useEffect, useState } from "react";
import { Bookmarks } from "@/services";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { removeBookMark } from "@/app/slices/bookmarkedSlice";
const useBookmarkUnbookmark = ({PostId}) => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(null);
    
    
    const BookmarkUnbookmark = async () => {
        if (PostId) {
            try {
                setIsLoading(true);
                setError(null);
                const response = await Bookmarks.bookmarkUnbookmark(PostId);
                if (response?.data?.success) {
                    dispatch(removeBookMark())
                    setState(response.data.data.bookmark);
                    toast({
                        title: response.data.message,
                    });
                }
            } catch (error) {
                setError(error.message);
                toast({
                    title: "Error",
                    description: error.message || "Something went wrong while changing follow state.",
                    variant: "destructive"
                });
                console.error(error.message || "Something went wrong while changing follow state.");
            } finally {
                setIsLoading(false);
            }
        }
    };
    // useEffect(() => {
    //     ;(  async () => {
    //             if (PostId) {
    //                 try {
    //                     setIsLoading(true);
    //                     setError(null);
    //                     const response = await Bookmarks.isBookmarked(PostId);
    //                     console.log(response);
    //                     if (response?.data?.success) {
    //                         setState(response?.data?.data?.isBookmarked)
    //                     }
    //                 } catch (error) {
    //                     setError(error.message);
    //                     toast({
    //                         title: "Error",
    //                         description: error.message || "Something went wrong while changing bookmark state.",
    //                         variant: "destructive"
    //                     });
    //                     console.error(error.message || "Something went wrong while changing bookmark state.");
    //                 } finally {
    //                     setIsLoading(false);
    //                 }
    //             }
    //         }
    //     )()
    // }, [PostId])

    return [state, error, isLoading, BookmarkUnbookmark];
}

export default useBookmarkUnbookmark