import axios from "axios";
class _Find{
    findUser = async ({username}) => {
        console.log(username);
        if(!username) throw error
        return await axios.get("/api/v1/post/find-user",
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            }
        )

    }
    
}

export const Find = new _Find();