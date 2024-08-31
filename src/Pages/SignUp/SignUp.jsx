import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import img from '../../assets/register/register.jpg'
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../customsHooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CgSpinnerTwoAlt } from "react-icons/cg";

const SignUp = () => {
  const { createUser, signInWithGoogle, signInWithGithub, updateUserProfile, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const from = location?.state || '/';

  const onSubmit = async data => {
    // console.log(data)
    const { email, password, name} = data;
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image)

    try{
      setLoading(true)
      // IMAGE UPLOAD =========
      const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData)
      console.log(data.data.display_url);
      // user create and sign up -------------
      const result = await createUser(email, password);
      console.log(result);
      // name and image upload ------------
      await updateUserProfile(name, data.data.display_url);
      toast.success('SignUp success')
      navigate(from);
    }catch(error){
      console.log(error);
      toast.error('Please try again')
      setLoading(false)
    }
  };

  //   google login ========
  const handleGoogle = async () => {
    setLoading(true)
    await signInWithGoogle()
    toast.success('Google Login success')
    navigate(from)
  }
  // github login =======
  const handleGithub = async () => {
    setLoading(true)
    await signInWithGithub();
    toast.success('Github Login success')
    navigate(from)
  }

  return (
    <>
      <Helmet>
        <title>DevForum || Sign Up</title>
      </Helmet>

      <div className='my-10 flex justify-center items-center min-h-[calc(100vh-306px)]'>
        <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
          <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
            <div className='flex justify-center mx-auto'>
              <img
                className='w-auto h-7 sm:h-8'
                src={logo}
                alt=''
              />
            </div>

            <p className='mt-3 text-xl text-center text-gray-600 '>
              Get Your Free Account Now.
            </p>
            {/* ============== google login ================*/}
            <button disabled={loading} onClick={handleGoogle} className='flex disabled:cursor-not-allowed cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 w-full'>

              <div className='px-4 py-2'>
                <svg className='w-6 h-6' viewBox='0 0 40 40'>
                  <path
                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                    fill='#FFC107'
                  />
                  <path
                    d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                    fill='#FF3D00'
                  />
                  <path
                    d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                    fill='#4CAF50'
                  />
                  <path
                    d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                    fill='#1976D2'
                  />
                </svg>
              </div>

              <span className='w-5/6 px-4 py-3 font-bold text-center'>
                Sign Up with Google
              </span>
            </button>

            {/* =============== github login ============== */}

            <button disabled={loading} onClick={handleGithub} className='flex disabled:cursor-not-allowed cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 w-full'>
              <div className='px-4 py-2'>
                <FaGithub />

              </div>

              <span className='w-5/6 px-4 py-3 font-bold text-center'>
                Sign Up with Github
              </span>
            </button>

            <div className='flex items-center justify-between mt-4'>
              <span className='w-1/5 border-b  lg:w-1/4'></span>

              <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
                or Registration with email
              </div>

              <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
            </div>

            {/* ================== input form ================ */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='mt-4'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='name'
                >
                  Username
                </label>
                <input
                  id='name'
                  autoComplete='name'
                  name='name'
                  {...register("name", { required: true })}
                  className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                  type='text'
                />
                {
                  errors.name && <span className="text-red-500">This field is required</span>
                }
              </div>
              {/* <div className='mt-4'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='photo'
                >
                  Photo URL
                </label>
                <input
                  id='photo'
                  autoComplete='photo'
                  name='photo'
                  {...register("image")}
                  className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                // type='url'
                />
              </div> */}
              <div className='mt-4'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='LoggingEmailAddress'
                >
                  Email Address
                </label>
                <input
                  id='LoggingEmailAddress'
                  autoComplete='email'
                  name='email'
                  {...register("email", { required: true })}
                  className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                  type='email'
                />
                {
                  errors.email && <span className="text-red-500">This field is required</span>
                }
              </div>

              <div className='mt-4'>
                <div className='flex justify-between'>
                  <label
                    className='block mb-2 text-sm font-medium text-gray-600 '
                    htmlFor='loggingPassword'
                  >
                    Password
                  </label>
                </div>

                <input
                  id='loggingPassword'
                  autoComplete='current-password'
                  name='password'
                  placeholder='********'
                  {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
                  className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                  type='password'
                />
                {
                  errors.password?.type === 'minLength' && <p className="text-red-600"> password must be 6 characters</p>
                }
                {
                  errors.password?.type === 'pattern' && <p className="text-red-600"> password must be uppercase, lowercase, & spacial characters</p>
                }
              </div>

              <div>
                <label htmlFor='image' className='block mb-2 text-sm'>
                  Select Image:
                </label>
                <input
                  required
                  type='file'
                  id='image'
                  name='image'
                  {...register("image")}
                  accept='image/*'
                />
              </div>

              <div className='mt-6'>
                <button disabled={loading} type="submit" className='disabled:cursor-not-allowed w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>{loading ? <CgSpinnerTwoAlt className='m-auto animate-spin' size={20} /> : 'Sign Up'} </button>
              </div>
            </form>
            <div className='flex items-center justify-between mt-4'>
              <span className='w-1/5 border-b  md:w-1/4'></span>

              <Link
                to='/login'
                className='text-xs text-gray-500 uppercase  hover:underline'
              >
                or sign in
              </Link>

              <span className='w-1/5 border-b  md:w-1/4'></span>
            </div>
          </div>
          <div
            className='hidden bg-cover bg-center lg:block lg:w-1/2'>
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;