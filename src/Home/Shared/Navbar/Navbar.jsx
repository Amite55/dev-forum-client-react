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
        {
          user &&  <li><NavLink to='/membership'>Membership</NavLink></li>
        }

    </>
    return (
        <>
            <div className="navbar fixed top-0 z-10 bg-opacity-55 bg-base-100 max-w-screen-xl">
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
                    <Link to='/' className="btn btn-ghost text-xl font-mono">DevForum</Link>
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
                            <>
                                <p className='font-bold mr-3 hidden md:block'>{user?.displayName}</p>

                                <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li> <Link to='/dashboard'>Dashboard</Link> </li>
                                    <li onClick={handleLogOut}><Link>Logout</Link></li>
                                </ul>
                                </div>
                            </>
                        :
                         <li className='btn btn-ghost btn-sm'> <Link to='/login'>Join Us</Link></li>
                    }
                </div>
            </div>
















{/* 
            <div className="navbar bg-base-100">
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div> */}
        </>
    );
};

export default Navbar;