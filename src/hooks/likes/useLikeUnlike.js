import { useEffect, useState } from "react";
import { Likes } from "@/services";
import { useToast } from "@/components/ui/use-toast";

const useLikeUnlike = ({PostId}) => {
    const { toast } = useToast();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(null);
    
    const LikeUnLike = async () => {
        if (PostId) {
            try {
                setIsLoading(true);
                setError(null);
                const response = await Likes.likeUnlikePost(PostId)
                if (response?.data?.success) {
                    setState(response.data);
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

    return [state, error, isLoading, LikeUnLike];
}

export default useLikeUnlike