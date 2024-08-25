import React from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../customsHooks/useAxiosSecure';
import useAuth from '../../../../customsHooks/useAuth';
import { Helmet } from 'react-helmet-async';

const AddAnnouncement = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { mutateAsync, reset } = useMutation({
        mutationFn: async (addPost) => {
            const { data } = await axiosSecure.post('/announcement', addPost);
            return data;
        },
        onSuccess: () => {
            reset();
            toast.success('Your Announcement add success')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const from = e.target;
        const title = from.title.value;
        const description = from.description.value;
        const email = user?.email;
        const authorImage = user?.photoURL;
        const author = user?.displayName;
        const postTime = new Date();

        // ada data
        try {
            const announcementData = { title, description, email, authorImage, author, postTime };
            await mutateAsync(announcementData)
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
                    <div className='divider text-xl font-bold'>
                        Announcement Hare
                    </div>

                    <div className='mt-4'>
                        <label
                            className='block mb-2 text-sm font-medium text-gray-600 '
                            htmlFor='name'
                        >
                            Title
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


                    <input className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 mt-5' value="Send Your Announcement" type="submit" />
                </form>

            </div>
        </>
    );
};

export default AddAnnouncement;