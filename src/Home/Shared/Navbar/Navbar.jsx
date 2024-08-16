import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../customsHooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useAuth()
    console.log(user);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User LogOut Success')
            })
            .catch((error) => {
                console.log(error);
                toast.error('Please try again')
            })
    }

    const navItem = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink>Parent</NavLink></li>

    </>
    return (
        <>
            <div className="navbar fixed bg-opacity-55 bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content space-y-1 bg-dark-100 rounded-box z-[100] mt-3 w-52 p-2 shadow">
                            {navItem}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl font-mono">DevForum</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {/* large screen */}
                    <ul className="menu menu-horizontal px-2 gap-2">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li> <Link to='/'>Profile</Link> </li>
                                    <li onClick={handleLogOut}><Link>Logout</Link></li>
                                </ul>
                            </div>
                        :
                         <li className='btn btn-ghost btn-sm'> <Link to='/login'>Join Us</Link></li>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;