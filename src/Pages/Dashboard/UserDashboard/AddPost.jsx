import React from 'react';
import Select from 'react-select'

const AddPost = () => {

    const options = [
        { value: 'chocolate', label: 'Mern' },
        { value: 'strawberry', label: 'React' },
        { value: 'vanilla', label: 'Frontend' },
        { value: 'vanilla', label: 'Backend' },
        { value: 'vanilla', label: 'Database' },
        { value: 'vanilla', label: 'Node' },
        { value: 'vanilla', label: 'PHP' },
        { value: 'vanilla', label: 'Javascript' },
        { value: 'vanilla', label: 'Java' },
        { value: 'vanilla', label: 'AI' },
        { value: 'vanilla', label: 'Devops' },
        { value: 'vanilla', label: 'Tools' },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        // const from = e.target;
        // const tag = from.tags.value
        // console.log(tag);
    }

    return (
        <div className='px-1 md:px-8'>

            <form onSubmit={handleSubmit}>
                <div className='flex items-center gap-3'>
                    {/* profile image  */}
                    <div className="avatar">
                        <div className="ring-cyan ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                     {/* profile name */}
                     <div>
                            <h3 className='font-bold text-xl'>User Name</h3>
                        </div>
                </div>

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
                  id='name'
                  required
                  autoComplete='name'
                  name='name'
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
         

                <input className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 mt-5' value="Post" type="submit" />
            </form>

        </div>
    );
};

export default AddPost;