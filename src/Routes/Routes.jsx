import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../MainLayout/DashboardLayout";
import { element } from "prop-types";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";
import AddPost from "../Pages/Dashboard/UserDashboard/AddPost";
import MyPost from "../Pages/Dashboard/UserDashboard/MyPost";
import PostDetails from "../Pages/PostDetails/PostDetails";
import PrivateRoute from "./PrivateRoute";
import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser/ManageUser";
import Announcement from "../Home/Announcement/Announcement";
import Activities from "../Pages/Dashboard/AdminDashboard/Activities/Activities";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      errorElement: <ErrorPage/>,
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
        },
        {
          path: '/post/:id',
          element: <PrivateRoute><PostDetails/></PrivateRoute>
        }
      ]
    },

    // ============ Dashboard route ================
    {
      path: '/dashboard', 
      element: <DashboardLayout/>,
      children: [
        {
          index: true,
          element: <MyProfile/>
        },
        {
          path: 'my-post',
          element: <MyPost/>
        },
        {
          path: 'add-post',
          element: <AddPost/>
        },
        // admin dashboard =====
        {
          path: 'manage-users',
          element: <ManageUser/>
        },
        {
          path: 'announcement',
          element: <Announcement/>
        },
        {
          path: 'activities',
          element: <Activities/>
        }
      ],
    }
  ]);