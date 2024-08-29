import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAxiosCommon from '../../customsHooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';

const AllPostedData = ({ allPost }) => {
    const axiosCommon = useAxiosCommon();
    const { author, authorImage, title, description, tags} = allPost;
    const date = new Date(allPost?.postTime).toLocaleString();

       // comment get ==========
       const {data: comment = [] } = useQuery({
        queryKey: ['comment', allPost?._id],
        queryFn: async () => {
            const {data: postComment} = await axiosCommon.get(`/comment/${allPost?._id}`);
            return postComment
        }
    })
    console.log(comment);

    return (
        <div className="max-w-2xl mx-auto my-10 px-8 py-4 rounded-lg shadow-md dark:bg-white">
            <Link to={`/post/${allPost?._id}`}>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-900 ">{date}</span>

                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={authorImage} alt="avatar" />
                        <a className="font-bold text-black cursor-pointer dark:text-black" tabindex="0" role="link">{author}</a>
                    </div>
                </div>

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-black hover:underline" tabindex="0" role="link" >{title}</a>
                    <p className="mt-2 text-black dark:text-black">{description}</p>
                </div>

                <div className='mt-4 flex justify-end mr-5 mb-2'>
                    <p className='text-black'>Tags: <span className='text-cyan-400 bg-cyan-100 px-2 w-auto rounded-full'>{tags}</span></p>
                </div>
                <hr className='mt-1 px-7' />
                <div className="flex mt-1">
                    {/* <div className='flex gap-1'>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='UpVote:'><BiUpvote size='15' /></p>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='DownVote:'><BiDownvote size='15' /></p>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='Comment'><FaRegComment size='15' /></p>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='Share'><FaShare size='15' /></p>
                    </div> */}
                    <div className='flex  gap-2 md:gap-2'>
                        <small className='text-gray-900 '>UpVote:{allPost?.upVote}</small>
                        <small className='text-gray-900'>DownVote:{allPost?.downVote}</small>
                        <small className='text-gray-900'>Comment:{comment?.length}</small>
                        <small className='text-gray-900'>Share:{allPost?.sharePost}</small>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AllPostedData;

AllPostedData.propTypes = {
    allPost: PropTypes.object,
};