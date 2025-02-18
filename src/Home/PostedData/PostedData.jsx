import AllPostedData from './AllPostedData';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../component/LoadnigSpiner';
import useAxiosCommon from '../../customsHooks/useAxiosCommon';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../SearchProvider/SearchProvider';

const PostedData = () => {
  const { search } = useContext(SearchContext);
  const [params, setParams] = useSearchParams();
  const [itemPerPage, setItemPerPage] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, serCurrentPage] = useState(1);
  const [sort, setSort] = useState('');
  const axiosCommon = useAxiosCommon();
  const tags = params.get('tags');


  console.log(sort);
  // fetch postedData all Data ============
  const { data: postedData = [], isLoading } = useQuery({
    queryKey: ['postedData', tags, currentPage, itemPerPage, search, sort],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/postedData?search=${search}&tags=${tags}&page=${currentPage}&size=${itemPerPage}&sort=${sort}`);
      return data;
    },
  });

  // get all post data count =====
  useEffect(() => {
    const countPost = async () => {
      const { data } = await axiosCommon.get(`/post-count?search=${search}&tags=${tags}&page=${currentPage}&size=${itemPerPage}`);
      setCount(data?.count);
    }
    countPost();
  }, [search, tags, currentPage, itemPerPage])
  const numberOfPage = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPage).keys()].map(e => e + 1);
  if (isLoading) return <LoadingSpinner />

  // handle pagination button ================
  const handlePaginationButton = (value) => {
    serCurrentPage(value)
  }
  return (

    <>
      {
        postedData && postedData.length > 0
          ?
          <div>
              {/* ============ sorting======== */}
            <div className='mx-auto mr-4 text-right md:mr-40 mt-4'>
              <select
                onChange={(e) => {
                  setSort(e.target.value)
                  // serCurrentPage(1)
                }}
                name='sorting'
                id='sorting'
                className=' border border-cyan-500  p-4 rounded-md'
              >
                <option value=''>Sort By Votes</option>
                <option value='dsc'>Descending Order</option>
                <option value='asc'>Ascending Order</option>
              </select>
            </div>

            {
              postedData?.map(allPost => <AllPostedData key={allPost._id} allPost={allPost} />)
            }
          </div>
          :
          <div className='text-center my-10' >
            <div className='text-2xl font-bold'>
              No Posted Data Available In This Tags Category!
            </div>
            <div className='font-light text-neutral-500 mt-2'>
              Please Select Other Tags Categories.
            </div>
          </div>
      }


      <div className='flex justify-center my-10 pb-10'>

        {/* previous button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-cyan-500  hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* number of button */}
        {pages?.map(btnNum => (
          <button

            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${currentPage === btnNum ? 'bg-cyan-500 text-white' : ''} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-cyan-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* ======= next button======= */}
        <button
          disabled={currentPage == numberOfPage}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-cyan-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>


    </>


  );
};

export default PostedData;