import { useState, useEffect } from "react";
import { CloudMedia } from "@/services";

const useMediaIdToUrl = () => {
    const [idList, setIdList] = useState([]);
    const [urlList, setUrlList] = useState([]);
    const [isConverting, setIsConverting] = useState(false);

    useEffect(() => {
        const convertIdsToUrls = async () => {
            if (!idList || idList?.length === 0) return;

            setIsConverting(true);
            try {
                const urls = await Promise.all(idList?.map(async (id) => {
                    const response = await CloudMedia.getImageById(id);
                    if (response.data) {
                        return response.data.data.response.URL;
                    }
                    return null;
                }));
                setUrlList(urls.filter(Boolean));

            } catch (error) {
                console.error(error.message || "Something went wrong while converting IDs to URLs");
            } finally {
                setIsConverting(false);
            }
        };

        convertIdsToUrls();
    }, [idList]);

    return [setIdList, urlList, isConverting];
};

export { useMediaIdToUrl };
