import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store/store.js'
import { router, RouterProvider } from './routing/router.jsx'
import { StricktMode } from './constants'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  StricktMode && StricktMode ?
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
    :
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>

)
