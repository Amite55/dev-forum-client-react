import React from 'react';
import { BiDownvote, BiUpvote } from "react-icons/bi";
import useAxiosCommon from '../../customsHooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../component/LoadnigSpiner';
import { FaRegComment } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa6';
import { FacebookIcon, FacebookShareButton, FacebookShareCount, LinkedinIcon, LinkedinShareButton } from 'react-share';
import { Helmet } from 'react-helmet-async';

const PostDetails = () => {
    const { id } = useParams();
    console.log(id);
    const axiosCommon = useAxiosCommon();

    const { data: postedData = {}, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/post/${id}`);
            console.log(data);
            return data;
        }
    })

    const { author, authorImage, title, description, tags, commentsCount, upVote, downVote, sharePost } = postedData;

    const date = new Date(postedData?.postTime).toLocaleString();
    if (isLoading) return <LoadingSpinner />

    return (
       <>
       <Helmet>
            <title>Post Details || DevForum</title>
       </Helmet>
       
       <div>
            <div className="max-w-2xl mx-auto mt-24 px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                <div className="flex items-center justify-between mt-1">

                    <div className='flex gap-1'>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='UpVote:'><BiUpvote size='15' /></p>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='DownVote:'><BiDownvote size='15' /></p>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='Comment'><FaRegComment size='15' /></p>
                        <p className='text-white hover:bg-slate-600 rounded-full md:px-2 py-1' title='Share'><FaShare size='15' /></p>
                    </div>

                    <div className='flex gap-1 md:gap-2'>
                        <small className='text-white '>UpVote:{upVote}</small>
                        <small className='text-white'>DownVote:{downVote}</small>
                        <small className='text-white'>Comment:{commentsCount}</small>
                        <small className='text-white'>Share:{sharePost}</small>
                    </div>
                </div>
            </div>
            <div className='max-w-2xl mx-auto my-2'> 

                <FacebookShareButton url={''} quote={title}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton url={''}>
                    <LinkedinIcon size={32} round/>
                </LinkedinShareButton>
            </div>

            <div className='max-w-2xl mx-auto '>
                <from>
                    <label>Write a comment.....</label>
                    <textarea className='w-full border border-cyan-400 px-2 focus:bg-cyan-50 rounded-lg' defaultValue='Start Your comment....' name="comment" id=""></textarea>
                </from>
            </div>
            {/* social link  */}
            
        </div>
       </>

    );
};

export default PostDetails;