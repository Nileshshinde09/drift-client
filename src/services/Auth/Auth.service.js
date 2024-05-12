import axios from "axios";

class AuthService {

    createAccount = async ({ fullName, username, email, gender, createPassword })=> {
        try {
            return await axios.post('/api/v1/users/register',
                {
                    fullName, username, email, gender, password: createPassword

                }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })
                .then(response => (response))
                .catch(error => (error));

        } catch (error) {
            console.log(`${error.message || "Error while creating user account"}`)
            throw error
        }
    }

    loginToAccount = async ({ email, password })=> {
        try {
            return await axios.post('/api/v1/users/login',
                {
                    email, password

                }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })
                .then(response => (response))
                .catch(error => (error));



        } catch (error) {
            console.log(`${error.message || "Error while login to your account"}`)
            throw error
        }
    }


    getUser = async () => {
        try {
            return await axios.get('/api/v1/users/current-user',
                {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })
                .then(response => (response))
                .catch(error => (error));

        } catch (error) {
            console.log(`${error.message || "Error while getting user data"}`)
            throw error
        }
    }

    generateEmailOtp = async () =>{
        try {
            return await axios.post('/api/v1/users/generate-otp',
                {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })
                .then(response => (response))
                .catch(error => (error));
        } catch (error) {
            console.log(`${error.message || "Error validating user through OTP"}`)
            throw error
        }
    }
    getvalidatedEmailOtp = async (otp) =>{
        try {
            if(!otp) throw error
            return await axios.post('/api/v1/users/validate-otp',
            {
                incomingOTP:otp
            },
                {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })
                .then(response => (response))
                .catch(error => (error));
        } catch (error) {
            console.log(`${error.message || "Error validating user through OTP"}`)
            throw error
        }
    }
}
const Auth = new AuthService()
export {
    Auth
}

