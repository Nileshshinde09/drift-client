import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store/store.js'
import { router, RouterProvider } from './routing/router.jsx'
import { STRICKTMODE } from './constants'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  STRICKTMODE && STRICKTMODE ?
    <React.StrictMode>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>
      </CookiesProvider>
    </React.StrictMode>
    :
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
)
