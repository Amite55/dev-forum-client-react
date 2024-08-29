import React from 'react';

const ShowComments = ({cmt}) => {
    const date = new Date(cmt?.time).toLocaleString();
    return (
        <div className="max-w-2xl mx-auto mt-5 px-8 py-4 rounded-lg shadow-sm dark:bg-white">
            <div>
                    <div className="flex ">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={cmt?.image} alt="avatar" />
                        <a className="font-bold text-gray-800 cursor-pointer dark:text-black" tabindex="0" role="link">{cmt?.name}</a>
                        <span className="text-sm font-light text-gray-600 dark:text-gray-800 ml-4">{date}</span>
                    </div>
                    <p className="mt-2 text-gray-800 dark:text-gray-800">
                        {cmt?.comment}  
                    </p>
                </div>
        </div>
    );
};

export default ShowComments;