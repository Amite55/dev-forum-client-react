import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../customsHooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuth from '../../../customsHooks/useAuth';
import LoadingSpinner from '../../../component/LoadnigSpiner';
import MyPostedTableRow from './MyPostedTableRow';
import toast from 'react-hot-toast';

const MyPost = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure();

    const {data: myPost = [], isLoading, refetch} = useQuery({
        queryKey: ['my-post', user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/my-post/${user?.email}`);
            return data;
        }
    })

    // Deleted post ========
    const {mutateAsync} = useMutation({
      mutationFn: async (id) => {
        const {data} = await axiosSecure.delete(`/post/${id}`);
        return data;
      },
      onSuccess: () => {
        toast.success('Your post deleted')
        refetch()
      }
    })


    // Delete post ======
    const handleDelete = async (e) => {
      console.log(e);
      try{
        await mutateAsync(e)
      } catch(error) {
        console.log(error);
        toast.error('Please try again')
      }
    }

    if(isLoading) return <LoadingSpinner/>

    return (
        <>
        <Helmet>
          <title>My Listings</title>
        </Helmet>
  
        <div className='container mx-auto px-4 sm:px-8'>
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
                        Title
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Date
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       Number of votes
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       Comment
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {/* Room row data */}
                    {
                        myPost.map(post => 
                        <MyPostedTableRow 
                        key={post._id} 
                        post={post}
                        handleDelete={handleDelete}
                        />)
                    }

                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default MyPost;