import axios from "axios";

class AuthService {

    createAccount = async ({ fullName, username, email, gender, createPassword }) => {
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

    loginToAccount = async ({ email, password }) => {
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

    logout = async () => {
        try {
            return await axios.post('/api/v1/users/logout',
                {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            })

        } catch (error) {
            console.log(`${error.message || "Error while logging out."}`)
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

    generateEmailOtp = async () => {
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
    getvalidatedEmailOtp = async (otp) => {
        try {
            if (!otp) throw error
            return await axios.post('/api/v1/users/validate-otp',
                {
                    incomingOTP: otp
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

    sendForgotPasswordEmail = async ({passwordResetUrl,email}) => {
        try {
            if (!passwordResetUrl || !email) throw error
            return await axios.post('/api/v1/users/send-reset-forgot-password-email',
                {
                    passwordResetUrl,
                    email
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                })
        } catch (error) {
            console.log(`${error.message || " Error while sending email "}`)
            throw error
        }
    }

    resetForgotPasswordEmail = async (newPassword) => {
        try {
            if (!newPassword) throw error
            return await axios.post('/api/v1/users/reset-forgot-password',
            {
                newPassword
            },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                })
        } catch (error) {
            console.log(`${error.message || " Error while resetting password "}`)
        }
    }
    verifyForgotPasswordPageVerification = async () => {
        try {
            return await axios.post('/api/v1/users/reset-forgot-password-page-verification',
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                })
        } catch (error) {
            console.log(`${error.message || " Error while sending email "}`)
            throw error
        }
    }

}
export const Auth = new AuthService()


