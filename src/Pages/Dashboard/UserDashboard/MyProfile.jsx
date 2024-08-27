import Profile from '../Profile/Profile';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../customsHooks/useAxiosSecure';
import useAuth from '../../../customsHooks/useAuth';
import AllPostedData from '../../../Home/PostedData/AllPostedData';
import LoadingSpinner from '../../../component/LoadnigSpiner';
import useRole from '../../../customsHooks/useRole';
import PieChartAdmin from '../AdminDashboard/ManageUser/PieChartAdmin';

const MyProfile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [role] = useRole();

    const { data: PostedData = [], isLoading } = useQuery({
        queryKey: ['my-post', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-post/${user?.email}`)
            return data;
        }
    })
    const { data: posts = [] } = useQuery({
        queryKey: ['postedData'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/postedData`)
            return data;
        }
    })
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users`)
            return data;
        }
    })
    
    
    
    if (isLoading) return <LoadingSpinner />

    return (
        <div>
            <Profile />

            

            {/* <AllPostedData/> */}

            {
                role === 'admin' && <>

                    <div className='py-8'>
                        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                <table className='min-w-full leading-normal'>
                                    <thead>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Number Of User
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Number Of Comment
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Number Of User
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* User data table row */}

                                        <tr>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                <p className='text-gray-900 whitespace-no-wrap'>{users?.length}</p>
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                <p className='text-gray-900 whitespace-no-wrap'>1</p>
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                <p className='text-gray-900 whitespace-no-wrap'>{posts?.length}</p>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                    <PieChartAdmin users={users} posts={posts} />


                </>
            }



            {
                PostedData && PostedData.length > 0
                    ?
                    <div>
                        {
                            PostedData?.map(allPost => <AllPostedData key={allPost._id} allPost={allPost} />)
                        }
                    </div>
                    :

                    <div className='text-center my-10' >
                        <div className='text-2xl font-bold'>
                            No Posted Data Available In This Tags Category!
                        </div>
                    </div>

            }
        </div>
    );
};

export default MyProfile;