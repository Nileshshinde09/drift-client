import { useEffect, useState } from "react";
import { Follows } from "@/services";
import { useToast } from "@/components/ui/use-toast";

const useFollowUnfollow = (username) => {
    const { toast } = useToast();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState(null);

    const followUnfollow = async () => {
        if (username) {
            try {
                setIsLoading(true);
                setError(null);
                const response = await Follows.followUnfollowUser({ username });
                if (response?.data?.success) {
                    setState(response.data.data.followed);
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
    useEffect(() => {
        ;(  async () => {
                if (username) {
                    try {
                        setIsLoading(true);
                        setError(null);
                        const response = await Follows.isFollwed({ username });
                        if (response?.data) {
                            setState(response?.data?.data?.followed)
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
            }
        )()
    }, [username])

    return [state, error, isLoading, followUnfollow];
};

export { useFollowUnfollow };
