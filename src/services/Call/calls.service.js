import axios from "axios";

class call {
    initializeCall = async (ice_Candidate,receiverId) => {
        try {
            
            console.log(ice_Candidate);
            if (!ice_Candidate || !receiverId) throw error
            return await axios.post("/api/v1/call/C/initialize-call-ice-candidate",
                {
                    receiverId,
                    ice_Candidate
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "something went wrong while making call.");
        }
    }

    makeCallRequest = async (paramsList) => {
        try {

            if (Object.values(paramsList).some(val => val === null)) throw error
            
            return await axios.post("/api/v1/call/C/make-call-request",
                {
                    ...paramsList
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "something went wrong while making call.");
        }
    }
    acceptCallRequest = async (paramsList) => {
        try {
            if (Object.values(paramsList).some(val => val === null)) throw error

            return await axios.post("/api/v1/call/C/accept-call-request",
                {
                    ...paramsList
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "something went wrong while accepting call request.");
        }
    }
    ansToCall = async (paramsList) => {
        try {
            if (Object.values(paramsList).some(val => val === null)) throw error
            return await axios.post("/api/v1/call/C/ans-to-call",
                {
                    ...paramsList
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "something went wrong while initializing call with sharing ice candidates.");
        }
    }
}

export const Calls = new call();


