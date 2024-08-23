import PropTypes from 'prop-types'
import { useState } from 'react';
import DeleteModal from './DeleteModal';

const MyPostedTableRow = ({ post,  handleDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
      setIsOpen(false)
    }

     const date =new Date(post?.postTime).toDateString();
    return (
        <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap font-bold'>{post?.title}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{date}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>3</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>4</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button 
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Delete</span>
          </button>
          {/* Delete modal */}

          <DeleteModal 
          isOpen={isOpen} 
          closeModal={closeModal} 
          handleDelete={handleDelete}
          id={post?._id}
          />
        </td>
      </tr>
    );
};

MyPostedTableRow.propTypes = {
    room: PropTypes.object,
    refetch: PropTypes.func,
  }

export default MyPostedTableRow;