import axios from "axios";
class usrname {
    findusrname = async () => {
        try {

            const response = await axios.get(
                `/api/v1/find/find-user/?username=${debouncedUserInput[0]}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            if (response)
                console.log(response);
        } catch (error) {
            console.log(error.message || "Something went wrong while finding username from the database. ");
            return null
        }
    }

}
const Usrname = new usrname()
export {
    Usrname
}