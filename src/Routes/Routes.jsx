import { Children } from "react";
import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/signUp',
          element: <SignUp/>
        }
      ]
    },
  ]);