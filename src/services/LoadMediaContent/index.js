// you can give any name to this class
import axios from "axios";
class loadMediaContent {
    // we are need to make this function async
    // so i here to methods are present one is .then() another is await
    // so i wrap this resoponse in try catch so if is there any error occured trycatch will handle that
    loadAnoAssets = async () => {
        try {
            const response = await axios.get("/api/v1/fileloader/load-ano-assets",
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            if(response)
        console.log(response);
        } catch (error) {
            console.log(error.message || "Something went wrong while getting ano images from the database. ");
            return null
        }
    }

}
const LoadMediaContent = new loadMediaContent()
export {
    LoadMediaContent
}