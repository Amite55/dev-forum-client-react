import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../../customsHooks/useAxiosSecure';
import { MdAutoDelete } from "react-icons/md";
import DeleteActivities from './DeleteActivities';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../../component/LoadnigSpiner';


const ActivityReportRow = ({report}) => {
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
      setIsOpen(false)
    }

    // get the reported comment data=====
    const {data: postedData, refetch, isLoading} = useQuery({
        queryKey: ['postedData', report?.postedId, report?._id],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/postedData/${report?.postedId}`)
            return data;
        }
    })

    // deleted the report data =====
    const {mutateAsync, reset} = useMutation({
      mutationFn: async () => {
        const {data} = await axiosSecure.delete(`/report/deleted/${report?._id}`)
        return data;
      },
      onSuccess: () => {
        toast.success('Report Deleted')
        reset()
      }
    })

    // handle delete ====
    const handleDelete = async () => {
      try{
        await mutateAsync()
        refetch()
      } catch(error){
        console.log(error);
        toast.error('please try again');
      }
    }

    if(isLoading) return <LoadingSpinner/>
    
    const date = new Date(report?.reportTime).toLocaleDateString();
    return (
        <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap font-bold'>{postedData?.title}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{report?.comment}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{report?.report}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>
            <button 
            className='hover:text-cyan-500 font-semibold'>{report?.email}</button>
            </p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='whitespace-no-wrap'>
          {date}
          </p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='whitespace-no-wrap'>
           <button
           onClick={() => setIsOpen(true)}
           >
            <MdAutoDelete size={24} className='text-red-600 hover:text-red-400' />
           </button>
           {/* delete activity */}
           <DeleteActivities 
           handleDelete={handleDelete}
           isOpen={isOpen} 
          closeModal={closeModal}
           />
          </p>
        </td>
      </tr>
    );
};

export default ActivityReportRow;