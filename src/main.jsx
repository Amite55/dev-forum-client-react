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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <HelmetProvider>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router} />
        </div>
          <Toaster />
      </HelmetProvider>
    </Authprovider>
  </StrictMode>,
)
