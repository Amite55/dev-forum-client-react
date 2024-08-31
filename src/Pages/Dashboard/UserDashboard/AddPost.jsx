import React from 'react';
import Select from 'react-select'
import useAuth from '../../../customsHooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../customsHooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useBadge from '../../../customsHooks/useBadge';
import JoinMembershipBtn from '../../MemberShip/JoinMembershipBtn';

const AddPost = () => {
  const { user } = useAuth();
  const [badge] = useBadge();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();
  //  tags data ======
  const options = [
    { value: 'Mern', label: 'Mern' },
    { value: 'React', label: 'React' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Database', label: 'Database' },
    { value: 'Node', label: 'Node' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Java', label: 'Java' },
    { value: 'AI', label: 'AI' },
    { value: 'Devops', label: 'Devops' },
    { value: 'Tools', label: 'Tools' },
  ];


  const { data: myPost = [] } = useQuery({
    queryKey: ['my-post', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-post/${user?.email}`);
      return data;
    }
  })

  // this post will be add to database==============
  const { mutateAsync, reset } = useMutation({
    mutationFn: async (addPost) => {
      const { data } = await axiosSecure.post('/post', addPost);
      return data;
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = e.target;
    const tags = from.tags.value;
    const title = from.title.value;
    const description = from.description.value;
    const email = user?.email;
    const authorImage = user?.photoURL;
    const author = user?.displayName;
    const postTime = new Date();
    const commentsCount = 0;
    const upVote = 0;
    const downVote = 0;
    const sharePost = 0;
    // ada data
    try {
      const addPost = { tags, title, description, email, authorImage, author, postTime, commentsCount, upVote, downVote, sharePost };
      await mutateAsync(addPost)
      toast.success('Added Your post.')
      reset()
      navigate('/dashboard/my-post')
    } catch (error) {
      console.log(error);
      toast.error('Something is wrong.')
    }
  }



  return (
    <>
      <Helmet>
        <title>Add Post || Dashboard</title>
      </Helmet>

      <div className='px-1 md:px-8'>

        <form onSubmit={handleSubmit}>
          <div className='flex items-center gap-3'>
            {/* profile image  */}
            <div className="avatar">
              <div className="ring-cyan ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                <img src={user?.photoURL} />
              </div>
            </div>
            {/* profile name */}
            <div>
              <h3 className='font-bold text-xl'>{user?.displayName}</h3>
            </div>
          </div>
          {/* tags */}
          <Select
            name="tags"
            required
            options={options}
            className=" rounded-lg w-full my-4 focus:bg-cyan-400"
            classNamePrefix="select"
          />

          <div className='mt-4'>
            <label
              className='block mb-2 text-sm font-medium text-gray-600 '
              htmlFor='name'
            >
              Post Title
            </label>
            <input
              id='title'
              required
              autoComplete='title'
              name='title'
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-cyan-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
              type='text'
            />
          </div>
          <div className='mt-4'>
            <label
              className='block mb-2 text-sm font-medium text-gray-600 '
              htmlFor='name'
            >
              Description
            </label>
            <textarea
              className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-cyan-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
              name="description"
              required
            ></textarea>
          </div>


          {
            badge !== 'Gold' && myPost?.length > 4 ? <div> 
              <div className='divider'>
              <h1 className='font-bold text-lg mx-auto mt-2 text-red-600'>Your Limit Over</h1>
              </div>
              <p className='bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg text-center'> Join Our Package<JoinMembershipBtn/></p>
              
            </div>
              :
              <button
                className=' w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 mt-5' type="submit" >
                Post
              </button>
          }

        </form>

      </div>
    </>
  );
};

export default AddPost;