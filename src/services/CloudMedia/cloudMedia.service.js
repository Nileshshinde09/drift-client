import axios from "axios";
class cloudMedia {
    getAnoImageById = async (id) => {
        if (!id)
            throw error
        const params = { id }
        try {
            return await axios.get("/api/v1/fileloader/load-ano-image-by-id", { params },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while loading ano image by Id.");
        }
    }
    getImageById = async (imageId) => {
        if (!imageId)
            throw error
        const params = { imageId }
        try {
            return await axios.get("/api/v1/fileloader/load-image-by-id", { params },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while loading ano image by Id.");
        }
    }

    uploadImage = async (file) => {
        if (!file)
            throw error
        console.log(file);
        const formdata = new FormData();
        formdata.append("file", file);
        try {
            return await axios.post("/api/v1/uploader/upload-image-content", formdata,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while uploading image.");
        }
    }
}

export const CloudMedia = new cloudMedia()