import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { About, Copyright, Messanger, ContactUs, Call, Chat, Ringtones, TermsNConditions, Home, AuthLayout, AppLayout, Feed, Post, Dashboard, FindPeoples, CreatePost, Profile, EditPost, UpdateProfile, Support, GroupChat, JourneyJournals, CreateJJ, Space, VideoFeed, IndividualPost } from '@/pages'
import App from '@/Initializer/App.jsx'
import { ProtectedAuthLayout, Otp, Signup, Login, CreatePostDialog } from '@/components'
import { PageNotFound, SendForgotPasswordMail, VerifyForgotPassword } from '@/components'
import { faces } from '@cloudinary/url-gen/qualifiers/region'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route
                path='/'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Home />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/journeyjournals'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <JourneyJournals />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/journeyjournals/:username'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <JourneyJournals />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/journeyjournals/create'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <CreateJJ />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/feed'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Feed />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
                        <Route
                path='/individual-post/:username'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <IndividualPost/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/video-feed'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <VideoFeed />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/video-feed/:username'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <VideoFeed />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/dashboard'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Dashboard/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/find-peoples'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <FindPeoples />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/create-post'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <CreatePost />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/post/:post_id'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Post />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/profile/:username'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Profile />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/update-profile'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <UpdateProfile />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/music-library'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Ringtones />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/edit-post/:postId'
                element={
                    <ProtectedAuthLayout authentication={true}>
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
            <Route
                path='/call/:type/:userId'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Call />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/messanger'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Messanger />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/messanger/:type/:recieverId'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Chat />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/messanger/:type/:recieverId/:createGroup'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <GroupChat />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/messanger/space/:recieverId'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AppLayout>
                            <Space />
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
                            <Route
                path='/forgot-password'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AuthLayout>
                            <SendForgotPasswordMail />
                        </AuthLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/forgot-password/verify/:token'
                element={
                    <ProtectedAuthLayout authentication={true}>
                        <AuthLayout>
                            <VerifyForgotPassword />
                        </AuthLayout>
                    </ProtectedAuthLayout>
                } />
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
            <Route path='/@DriftSocial'>
                <Route
                    path='/@DriftSocial/about'
                    element={<About />} />
                <Route
                    path='/@DriftSocial/contact-us'
                    element={<ContactUs />} />
                <Route
                    path='/@DriftSocial/terms-n-conditions'
                    element={<TermsNConditions />} />
                <Route
                    path='/@DriftSocial/copyright'
                    element={<Copyright />} />
                <Route
                    path='/@DriftSocial/support'
                    element={<Support />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Route>
    )
)

export {
    router,
    RouterProvider
}