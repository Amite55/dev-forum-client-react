import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Home/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation();
    const noNavbar = location.pathname.includes('login') || location.pathname.includes('signUp');
    return (
        <>
         {noNavbar || <Navbar/>}
         <Outlet/>
        </>
    );
};

export default Main;