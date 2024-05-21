import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home, AuthLayout,AppLayout,Feed,Dashboard,FindPeoples,CreatePost,Profile , UpdateProfile } from '@/pages'
import App from '@/Initializer/App.jsx'
import { ProtectedAuthLayout, Otp, Signup, Login } from '@/components'

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
                            <Home/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

                <Route
                path='/feed'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Feed/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

                <Route
                path='/dashboard'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Dashboard/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

                <Route
                path='/find-peoples'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <FindPeoples/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

                <Route
                path='/create-post'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <CreatePost/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />
            <Route
                path='/profile'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <Profile/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/update-profile'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AppLayout>
                            <UpdateProfile/>
                        </AppLayout>
                    </ProtectedAuthLayout>
                } />

            <Route
                path='/login'
                element={
                    <ProtectedAuthLayout authentication={false}>
                        <AuthLayout>
                            <Login/>
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
        </Route>

    )
)

export {
    router,
    RouterProvider
}