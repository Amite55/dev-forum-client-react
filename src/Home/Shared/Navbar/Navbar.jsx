import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../customsHooks/useAuth';
import toast from 'react-hot-toast';
import JoinMembershipBtn from '../../../Pages/MemberShip/JoinMembershipBtn';
import { IoNotificationsSharp } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../../customsHooks/useAxiosCommon';
import useBadge from '../../../customsHooks/useBadge';

const Navbar = () => {
    const { user, logOut } = useAuth()
    const axiosCommon = useAxiosCommon();
    const [badge] = useBadge();
    console.log(badge);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('User LogOut Success')
            })
            .catch((error) => {
                console.log(error);
                toast.error('Please try again')
            })
    };

    const { data: announcementData = [] } = useQuery({
        queryKey: ['announcementData'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/announcementData');
            console.log(data);
            return data;
        }
    })

    const navItem = <>
        <li><NavLink to='/'>Home</NavLink></li>

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
                            {/* ============ join membership and gold badge ============= */}
                            <button disabled={badge === 'Gold'} className='disabled:cursor-not-allowed '>
                                {
                                    user && <JoinMembershipBtn />
                                }
                            </button>
                        </ul>
                    </div>


                    <Link to='/' className="btn btn-ghost text-xl font-mono">DevForum</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    {/* large screen */}
                    <ul className="menu menu-horizontal px-2 gap-2">
                        {navItem}

                        {/* ============ join membership and gold badge ============= */}
                        <button disabled={badge === 'Gold'} className='disabled:cursor-not-allowed '>
                            {
                                user &&  <JoinMembershipBtn />
                            }
                        </button>

                    </ul>
                    
                </div>
                <div className="navbar-end">
                    <button className='mr-4 relative'>
                        <IoNotificationsSharp className=' text-cyan-600 hover:text-cyan-700' size={28} />
                        <span className='absolute bottom-2 right-0 text-red-500 font-semibold'>{announcementData?.length}</span>
                    </button>
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
        </>
    );
};

export default Navbar;