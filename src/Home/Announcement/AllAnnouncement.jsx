import React from 'react';

const AllAnnouncement = ({announcement}) => {
    return (
        <div className="mx-auto w-full max-w-lg px-8 py-4 mt-6 border border-red-500 rounded-lg shadow-lg mb-8">
                    <div className="flex justify-center -mt-16 md:justify-end">
                        <img className="object-cover w-16 h-16 border-2 border-blue-500 rounded-full dark:border-cyan-500" alt="Testimonial avatar" src={announcement?.authorImage} />
                    </div>
                    <h3 className='mt-2 text-md font-bold text-gray-600 dark:text-black'>{announcement?.title}</h3>

                    <p className="mt-2 text-xs text-gray-600 dark:text-black">{announcement?.description}</p>

                    <div className="flex justify-end mt-4">
                        <a href="#" className="text-lg font-medium text-blue-600 dark:text-blue-300" tabindex="0" role="link">{announcement?.author}</a>
                    </div>
                </div>
    );
};

export default AllAnnouncement;