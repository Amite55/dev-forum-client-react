import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../../customsHooks/useAxiosSecure';
import useAuth from '../../../../customsHooks/useAuth';
import PostCommentTableRow from './PostCommentTableRow';
import { useParams } from 'react-router-dom';

const MyPostComment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();


  // my posted data fetch the postedCollection bd===========
  const { data: myPost = [], isLoading, refetch } = useQuery({
    queryKey: ['my-post', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-post/${user?.email}`);
      return data;
    }
  })
  // const { data: postedData = {} } = useQuery({
  //     queryKey: ['post', id],
  //     queryFn: async () => {
  //         const { data } = await axiosSecure.get(`/post/${id}`);
  //         return data;
  //     }
  // })
  // console.log(postedData, 'spefic');

  // comment get ==========
  const { data: comment = [] } = useQuery({
    queryKey: ['comment', id],
    queryFn: async () => {
      const { data: postComment } = await axiosSecure.get(`/comment/${id}`);
      return postComment
    }
  })
  console.log(comment);

  return (
    <>
      <Helmet>
        <title>My Posted Details</title>
      </Helmet>

      <div className='container mt-10 mx-auto px-4 sm:px-8'>
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
                      Email
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
                      Feedback on Comment
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Report
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {/* Room row data */}
                  {
                    comment.length > 0 ? <>
                      {
                        comment.map(cmt => <PostCommentTableRow key={cmt?._id} cmt={cmt} />)
                      }
                    </>
                      :
                      <div className='text-center my-4'>
                          <h2 className='mx-auto text-center font-bold text-lg text-red-700 w-full'>No comment on your post!</h2>
                      </div>
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

export default MyPostComment;