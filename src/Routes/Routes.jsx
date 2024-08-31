import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../MainLayout/DashboardLayout";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile";
import AddPost from "../Pages/Dashboard/UserDashboard/AddPost";
import MyPost from "../Pages/Dashboard/UserDashboard/MyPost";
import PostDetails from "../Pages/PostDetails/PostDetails";
import PrivateRoute from "./PrivateRoute";
import ManageUser from "../Pages/Dashboard/AdminDashboard/ManageUser/ManageUser";
import Activities from "../Pages/Dashboard/AdminDashboard/Activities/Activities";
import AddAnnouncement from "../Pages/Dashboard/AdminDashboard/AddAnnouncement/AddAnnouncement";
import AdminRoute from "./AdminRoute";
import BookingModal from "../Pages/MemberShip/BookingModal";
import JoinMembershipBtn from "../Pages/MemberShip/JoinMembershipBtn";
import MyPostComment from "../Pages/Dashboard/UserDashboard/MyPostComment.jsx/MyPostComment";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },
      {
        path: '/post/:id',
        element: <PrivateRoute><PostDetails /></PrivateRoute>
      },
      {
        path: '/comment/postId/:id',
        element: <PrivateRoute>
          <MyPostComment/>
        </PrivateRoute>
      }
    ]
  },

  // ============ Dashboard route ================
  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute>
          <MyProfile />
        </PrivateRoute>
      },
      {
        path: 'my-post',
        element: <PrivateRoute>
          <MyPost />
        </PrivateRoute>
      },
      {
        path: 'add-post',
        element: <PrivateRoute>
          <AddPost />
        </PrivateRoute>
      },
      // admin dashboard =====
      {
        path: 'manage-users',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'add-announcement',
        element: <PrivateRoute>
          <AdminRoute>
            <AddAnnouncement />
          </AdminRoute>
        </PrivateRoute>
      },
      {
        path: 'activities',
        element: <PrivateRoute>
          <AdminRoute>
            <Activities />
          </AdminRoute>
        </PrivateRoute>
      }
    ],
  }
]);