import React, { useState } from 'react';
import { BiDownvote, BiUpvote } from "react-icons/bi";
import useAxiosCommon from '../../customsHooks/useAxiosCommon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../component/LoadnigSpiner';
import { FaRegComment } from 'react-icons/fa';
import { FaShare } from 'react-icons/fa6';
import { FacebookIcon, FacebookShareButton,  LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../customsHooks/useAxiosSecure';
import useAuth from '../../customsHooks/useAuth';
import toast from 'react-hot-toast';
import ShowComments from './ShowComments';

const PostDetails = () => {
    const {user} = useAuth();
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const { data: postedData = {}, isLoading, refetch } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/post/${id}`);
            return data;
        }
    })

    const { author, authorImage, title, description, tags, upVote, downVote, sharePost, _id } = postedData ;
    const date = new Date(postedData?.postTime).toLocaleString();

    // comment get ==========
    const {data: comment = [] } = useQuery({
        queryKey: ['comment', _id],
        queryFn: async () => {
            const {data: postComment} = await axiosSecure.get(`/comment/${_id}`);
            return postComment
        }
    })

    // comment post =========
    const {mutateAsync, reset} = useMutation({
        mutationFn: async (commentDetails) => {
            const {data: newComment} = await axiosSecure.post('/comments', commentDetails);
            return newComment;
        },
        onSuccess: () => {
            toast.success('Send Your Comment!')
            reset();
        }
    })

    // handle comment =====
    const handleComment = async (e) => {
        e.preventDefault();
        setLoading(true)
        const comment = e.target.comment.value;
        const time = new Date();
        const commentDetails = {
            email: user?.email,
            name: user?.displayName,
            postedId: postedData?._id,
            image: user?.photoURL,
            time,
            comment,
        }
        try{
            await mutateAsync(commentDetails);
        } catch(error) {
            console.log(error);
            toast.error('Your comment nor found');
        }
        setLoading(false)
    }

    // update upVote count UpVote ==============
    const {mutateAsync: VoteUpdate}  = useMutation({
        mutationFn: async (newVote) => {
            const {data} = await axiosSecure.patch(`/posted/upVote/${postedData?._id}`, newVote)
            return data;
        },
        onSuccess: (success) => {
            if(success.modifiedCount > 0){
                toast.success('Up vote success')
            }
            console.log(success);
            refetch()
        }
    })

    // update count downVote/upVote ===========
    const handleVote = async (type) => {
        // up vote functionality ============
        if(type === 'upVotes'){
            const newUPVote = {
                upVote: upVote + 1
            }
            try{
                await VoteUpdate(newUPVote);
            } catch(error){
                console.log(error);
                toast.error('Action Not Allow!')
            }
        }
        // down vote functionality ===========
        else if(type === 'downVotes'){
            const newDownVote = {
                downVote: downVote + 1,
            }
            try{
                await VoteUpdate(newDownVote);
            } catch(error){
                console.log(error);
                toast.error('Action Not Allow!')
            }
        }
    }

    
    if (isLoading) return <LoadingSpinner />
    return (
       <>
       <Helmet>
            <title>Post Details || DevForum</title>
       </Helmet>
       
       <div>
            <div className="max-w-2xl mx-auto mt-24 px-8 py-4 rounded-lg shadow-lg dark:bg-white">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-800">{date}</span>

                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={authorImage} alt="avatar" />
                        <a className="font-bold text-gray-800 cursor-pointer dark:text-black" tabindex="0" role="link">{author}</a>
                    </div>
                </div>

                <div className="mt-2">
                    <a href="" className="text-xl font-bold text-gray-700 dark:text-black" tabindex="0" role="link" >{title}</a>
                    <p className="mt-2 text-gray-800 dark:text-gray-900">{description}</p>
                </div>

                <div className='mt-4 flex justify-end mr-5 mb-2'>
                    <p className='text-white'>Tags: <span className='text-cyan-300 bg-cyan-500 px-2 w-auto rounded-md'>{tags}</span></p>
                </div>
                <hr className='mt-1 px-7' />
                <div className="flex items-center justify-between mt-1">

                    <div className='flex gap-1'>
                        <button  
                        onClick={() => handleVote('upVotes')} 
                        className='text-black hover:bg-gray-300 rounded-full md:px-2 py-1  active:bg-slate-300' title='UpVote:'>
                            <BiUpvote size='15' />
                        </button>
                        <button 
                        onClick={() => handleVote('downVotes')} 
                        className='text-black hover:bg-gray-300 rounded-full md:px-2 py-1' title='DownVote:'>
                            <BiDownvote size='15' />
                            </button>
                        <p className='text-black hover:bg-gray-300 rounded-full md:px-2 py-1' title='Comment'>
                            <FaRegComment size='15' />
                            </p>
                        <p className='text-black hover:bg-gray-300 rounded-full md:px-2 py-1' title='Share'>
                            <FaShare size='15' />
                            </p>
                    </div>

                    <div className='flex gap-1 md:gap-2'>
                        <small className='text-black '>UpVote:{upVote}</small>
                        <small className='text-black'>DownVote:{downVote}</small>
                        <small className='text-black'>Comment:{comment?.length}</small>
                    </div>
                </div>
            </div>
            <div className='max-w-2xl mx-auto my-2'> 

                <FacebookShareButton className='mr-2' url={'tutorial.com'} quote={title}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton className='mr-2' url={'tutorial.com'} >
                    <LinkedinIcon size={32} round/>
                </LinkedinShareButton>
                <WhatsappShareButton className='mr-2' url={'tutorial.com'} >
                    <WhatsappIcon size={32} round/>
                </WhatsappShareButton > 
                <TwitterShareButton className='mr-2' url={'tutorial.com'} >
                    <TwitterIcon size={32} round/>
                </TwitterShareButton>
            </div>

            <div className='max-w-2xl mx-auto '>
                <form onSubmit={handleComment} >
                    <label>Write a comment.....</label>
                    <textarea type='text' required className='w-full border border-cyan-400 px-2 focus:bg-cyan-50 rounded-lg focus:placeholder-transparent' placeholder='Start Your comment....' name="comment" id=""></textarea>

                    <button type='submit' className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 mt-2'>
                        {
                            loading ? '....' : 'Comment'
                        }
                    </button>
                </form>
            </div>
            
            {/* show comments details */}

            {
               comment?.length > 0 ? comment?.map(cmt => <ShowComments key={cmt?._id} cmt={cmt}/>)
                : 
               <>
                    <div className='text-center my-5'>
                        <h2 className='font-bold mx-auto text-lg'>No comment Post!</h2>
                    </div>
               </> 
            }
            
        </div>
       </>

    );
};

export default PostDetails;