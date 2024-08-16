import React from 'react';
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { FaRegComment, FaShare } from "react-icons/fa";
import PropTypes from 'prop-types';

const AllPostedData = ({allPost}) => {
    const {author, authorImage, title, description, tags, postTime, commentsCount, upVote, downVote, sharePost} = allPost;
    return (
        <div className="max-w-2xl mx-auto my-10 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-600 dark:text-gray-400">{postTime}</span>
            <a className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">Design</a>
        </div>

        <div className="mt-2">
            <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabindex="0" role="link" >{title}</a>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
        </div>

        <div className='mt-4 flex justify-start gap-2'>
            {
                tags.map(tag => <p className='bg-slate-600 px-2 w-auto rounded-md'>{tag}</p>)
            }
        </div>
       <hr className='mt-1 px-7' />
        <div className="flex items-center justify-between mt-1">
            
           <div className='flex gap-1'>
           <p className='text-white hover:bg-slate-600 rounded-full px-2 py-1' title='UpVote:'><BiUpvote size='15'/></p>
            <p className='text-white hover:bg-slate-600 rounded-full px-2 py-1' title='DownVote:'><BiDownvote size='15'/></p>
            <p className='text-white hover:bg-slate-600 rounded-full px-2 py-1' title='Comment'><FaRegComment size='15'/></p>
            <p className='text-white hover:bg-slate-600 rounded-full px-2 py-1' title='Share'><FaShare size='15'/></p>
           </div>

           <div className='flex gap-2'>
            <small className='text-white '>UpVote:{upVote}</small>
            <small className='text-white'>DownVote:{downVote}</small>
            <small className='text-white'>Comment:{commentsCount}</small>
            <small className='text-white'>Share:{sharePost}</small>
           </div>

            <div className="flex items-center">
                <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={authorImage} alt="avatar" />
                <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabindex="0" role="link">{author}</a>
            </div>
        </div>
    </div>
    );
};

export default AllPostedData;

AllPostedData.propTypes = {
    allPost: PropTypes.object,
  };