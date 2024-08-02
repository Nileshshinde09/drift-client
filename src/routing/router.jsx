import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About, Copyright, Messanger, ContactUs, Call, Chat, Ringtones, TermsNConditions, Home, AuthLayout, AppLayout, Feed, Post, Dashboard, FindPeoples, CreatePost, Profile, EditPost, UpdateProfile, Support, GroupChat, JourneyJournals, CreateJJ, Space } from '@/pages'
import App from '@/Initializer/App.jsx'
import { ProtectedAuthLayout, Otp, Signup, Login } from '@/components'
import { PageNotFound, SendForgotPasswordMail, VerifyForgotPassword } from '@/components'
// This code is not working 
// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App/>,
//         childern: 
//         [
//             {
//                 path: "/",
//                 element: <Home/>
//             },
//             {
//                 path: "/login",
//                 element:
//                     (
//                         <ProtectedAuthLayout authentication={false} >
//                             <Login />
//                         </ProtectedAuthLayout>
//                     )
//             },
//             {
//                 path: "/signup",
//                 element:
//                     (
//                         <ProtectedAuthLayout authentication={false}>
//                             <Signup />
//                         </ProtectedAuthLayout>
//                     )
//             }
//         ]
//     },
// ])
// 👇👇 This code is working 
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route
                path='/'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Home />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/journeyjournals'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <JourneyJournals />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/journeyjournals/:username'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <JourneyJournals />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/journeyjournals/create'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <CreateJJ />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/feed'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Feed />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/dashboard'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Dashboard />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/find-peoples'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <FindPeoples />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/create-post'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <CreatePost />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/post/:post_id'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Post />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/profile/:username'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Profile />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/update-profile'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <UpdateProfile />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route path='/music-library'>
                <Route
                    path='/music-library'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AppLayout>
                                <Ringtones />
                            </AppLayout>
                        </ProtectedAuthLayout>
                    } />
            </Route>
            <Route
                path='/edit-post/:postId'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <EditPost />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/login'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/signup'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AuthLayout>
                            <Signup />
                        </AuthLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/OTP'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AuthLayout>
                            <Otp />
                        </AuthLayout>
                    </ProtectedAuthLayout>
                } />
            <Route path='/call'>
                <Route
                    path='/call/:type/:userId'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AppLayout>
                                <Call />
                            </AppLayout>
                        </ProtectedAuthLayout>
                    } />
            </Route>
            <Route path='/messanger'>
                <Route
                    path='/messanger'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AppLayout>
                                <Messanger />
                            </AppLayout>
                        </ProtectedAuthLayout>
                    } />
                <Route
                    path='/messanger/:type/:recieverId'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AppLayout>
                                <Chat />
                            </AppLayout>
                        </ProtectedAuthLayout>
                    } />
                <Route
                    path='/messanger/:type/:recieverId/:createGroup'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AppLayout>
                                <GroupChat />
                            </AppLayout>
                        </ProtectedAuthLayout>
                    } />
                <Route
                    path='/messanger/space/:recieverId'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AppLayout>
                                <Space />
                            </AppLayout>
                        </ProtectedAuthLayout>
                    } />
            </Route>
            <Route path='/forgot-password'>
                <Route
                    path='/forgot-password'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AuthLayout>
                                <SendForgotPasswordMail />
                            </AuthLayout>
                        </ProtectedAuthLayout>
                    } />
                <Route
                    path='/forgot-password/verify/:token'
                    element={
                        <ProtectedAuthLayout authentication={false}>
                            <AuthLayout>
                                <VerifyForgotPassword />
                            </AuthLayout>
                        </ProtectedAuthLayout>
                    } />

            </Route>

            <Route path='/@DriftSocial'>
                <Route
                    path='/@DriftSocial/about'
                    element={
                        <About />
                    } />
                <Route
                    path='/@DriftSocial/contact-us'
                    element={
                        <ContactUs />
                    } />
                <Route
                    path='/@DriftSocial/terms-n-conditions'
                    element={
                        <TermsNConditions />
                    } />
                <Route
                    path='/@DriftSocial/copyright'
                    element={
                        <Copyright />
                    } />
                <Route
                    path='/@DriftSocial/support'
                    element={
                        <Support />
                    } />

            </Route>

            <Route path='*' element={<PageNotFound />} />

        </Route>

    )
)

export {
    router,
    RouterProvider
}