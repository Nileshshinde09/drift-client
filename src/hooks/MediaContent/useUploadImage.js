import { useState, useEffect } from "react";
import { CloudMedia } from "@/services";
import { useToast } from "@/components/ui/use-toast";
const useUploadImage = () => {
    const { toast } = useToast()
    const [file, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
    const [uploadedImageId, setUploadedImageId] = useState(null);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [uploadingPromise, setUploadingPromise] = useState(null);
    
    useEffect(() => {
        if (file) {
            const uploadPromise =  (async () => {
                try {
                    setIsImageUploading(true)
                    const response = await CloudMedia.uploadImage(file)
                    if(response.data){
                        console.log(response.data);
                        setUploadedImageId(response.data.data.uploadedImage.public_id);
                        setUploadedImageUrl(response.data.data.uploadedImage.URL);
                    }
                    setIsImageUploading(false)
                } catch (error) {
                    setIsImageUploading(false)
                    toast({
                        title: "Failed to Upload Image !!",
                        discription: error.message || "Something went wrong while uploading image!!",
                        variant: "destructive"
                    })
                }
                
            })();
            setUploadingPromise(uploadPromise);
        }

    }, [file,toast]);

    return [uploadedImageId, uploadedImageUrl, isImageUploading,setImageFile,uploadingPromise];
};

export default useUploadImage;
