import PropTypes from 'prop-types'
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { FaRegComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MyPostedTableRow = ({ post,  handleDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
      setIsOpen(false)
    }

     const totalVote = post?.upVote + post?.downVote;
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
          <p className='text-gray-900 whitespace-no-wrap'>{totalVote}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='whitespace-no-wrap'>
            <Link to={`/comment/postId/${post?._id}`}>
            <FaRegComments size={24} className='hover:text-cyan-500 font-bold'  />
            </Link>
            </p>
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