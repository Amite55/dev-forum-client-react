import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import Authprovider from './providers/Authprovider';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import SearchProvider from './SearchProvider/SearchProvider';
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Authprovider>
          <SearchProvider>
            <div className='max-w-screen-xl mx-auto'>
              <RouterProvider router={router} />
            </div>
          </SearchProvider>
          <Toaster />
        </Authprovider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
)
