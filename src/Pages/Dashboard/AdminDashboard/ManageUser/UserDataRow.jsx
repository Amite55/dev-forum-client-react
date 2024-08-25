import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from './UpdateUserModal';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../../customsHooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../../customsHooks/useAuth';


const UserDataRow = ({ user, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const {user: loggedInUser} = useAuth();
    const [isOpen, setIsOpen] = useState(false)

    const {mutateAsync} = useMutation({
        mutationFn: async (role) => {
            const {data} = await axiosSecure.patch(`/users/update/${user?.email}`, role);
            return data;
        },
        onSuccess: (data) => {
            console.log(data);
            refetch();
            toast.success('User Role Update success!')
            setIsOpen(false)
        }
    })

    // user role updated  modal handler 
    const modalHandler = async (selected) => {
        if(loggedInUser?.email === user?.email){
            toast.error('Action not Allowed');
            return setIsOpen(false);
        }
        const userRole = {
            role: selected,
        }
        try{
             await mutateAsync(userRole);
        } catch(error) {
            console.log(error);
            toast.error('Try Again');
        }
        console.log('user role updated', selected);
    }
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className={`${user?.badge === 'Gold' ? 'text-orange-600' : 'text-gray-900 '} whitespace-no-wrap`}>{user?.badge}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button 
        onClick={()=> setIsOpen(true)} 
        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal 
        setIsOpen={setIsOpen} 
        isOpen={isOpen} 
        modalHandler={modalHandler} 
        user={user} 
        />
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow