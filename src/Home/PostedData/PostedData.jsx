import AllPostedData from './AllPostedData';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../component/LoadnigSpiner';
import useAxiosCommon from '../../customsHooks/useAxiosCommon';

const PostedData = () => {
    const axiosCommon = useAxiosCommon();

    const {data: postedData=[], isLoading} = useQuery({
        queryKey: ['postedData'],
        queryFn: async () => {
            const {data} = await axiosCommon.get('/postedData');
            return data;
        }
    })
    console.log(postedData);
    if(isLoading) return <LoadingSpinner/>

    return (
        <div className=''>
            {
                postedData?.map(allPost => <AllPostedData key={allPost.id} allPost={allPost}/>)
            }
        </div>
    );
};

export default PostedData;