import axios from "axios";
class profile {
    updateProfile = async (updatedData) => {
        try {
            if (!updatedData) {
                throw error
            }
            return await axios.put("/api/v1/profile/S/update-profile", updatedData,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )

        } catch (error) {
            console.log(error.message || " something went wrong while updating profile!! ");
            return null
        }
    }
    getProfileImageById = async (id) => {
        try {
            if (!id) throw error
            return await axios.get("/api/v1/fileloader/load-image-by-id", {
                params: {
                    imageId: id
                }
            },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || " something went wrong while fetching image by its id ");
            return null
        }
    }
}

export const Profile = new profile(); 