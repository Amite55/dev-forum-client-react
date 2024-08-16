import React from 'react';

const TagList = () => {
    return (
        <div>
            <h4 className='divider my-10 font-bold font-mono '>Our All Tags</h4>
            <div className='w-4/6 mx-auto bg-slate-400 h-auto'>
                <div className='px-16 py-10 mx-auto grid md:grid-cols-4 space-y-2 text-center gap-5'>

                    <span className='rounded-lg bg-indigo-100/60 text-indigo-600'>#Frontend</span>
                    <span className='rounded-lg bg-yellow-100/60 text-yellow-600'>#Backend</span>
                    <span className='rounded-lg bg-orange-100/60 text-orange-600'>#Fullstack</span>
                    <span className='rounded-lg bg-blue-100/60 text-blue-600'>#HTML</span>
                    <span className='rounded-lg bg-teal-100/60 text-teal-600'>#CSS</span>
                    <span className='rounded-lg bg-violet-100/60 text-violet-600'>#Database</span>
                    <span className='rounded-lg bg-indigo-100/60 text-indigo-600'>#Github</span>

                </div>
            </div>
        </div>
    );
};

export default TagList;