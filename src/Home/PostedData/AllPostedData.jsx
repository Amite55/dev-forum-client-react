import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AllPostedData = ({ allPost }) => {
    const { author, authorImage, title, description, tags} = allPost;
    const date = new Date(allPost?.postTime).toLocaleString();
    return (
        <div className="max-w-2xl mx-auto my-10 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Link to={`/post/${allPost?._id}`}>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{date}</span>

                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={authorImage} alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">{author}</a>
                    </div>
                </div>

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabindex="0" role="link" >{title}</a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
                </div>

                <div className='mt-4 flex justify-end mr-5 mb-2'>
                    <p className='text-white'>Tags: <span className='text-cyan-400 bg-cyan-700 px-2 w-auto rounded-md'>{tags}</span></p>
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
                        <small className='text-white '>UpVote:{allPost?.upVote}</small>
                        <small className='text-white'>DownVote:{allPost?.downVote}</small>
                        <small className='text-white'>Comment:{allPost?.commentsCount}</small>
                        <small className='text-white'>Share:{allPost?.sharePost}</small>
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