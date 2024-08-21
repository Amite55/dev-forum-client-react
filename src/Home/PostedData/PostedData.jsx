import AllPostedData from './AllPostedData';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../component/LoadnigSpiner';
import useAxiosCommon from '../../customsHooks/useAxiosCommon';
import {  useSearchParams } from 'react-router-dom';

const PostedData = () => {
    const [params, setParams] = useSearchParams();
    const axiosCommon = useAxiosCommon();
    const tags = params.get('tags');
    console.log(tags);

    const { data: postedData = [], isLoading } = useQuery({
        queryKey: ['postedData', tags],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/postedData?tags=${tags}`);
            return data;
        }
    });
    console.log(postedData);
    if (isLoading) return <LoadingSpinner />

    return (

        <>
            {
                postedData && postedData.length > 0 
                    ? 
                <div>
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


        </>


    );
};

export default PostedData;