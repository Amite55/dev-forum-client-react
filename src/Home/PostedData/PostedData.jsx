import React, { useEffect, useState } from 'react';
import AllPostedData from './AllPostedData';

const PostedData = () => {
    const [data, setData] = useState();

    useEffect( () => {
        const fetchData = async () => {
            const response = await fetch("../../../public/fake.json")
            const data = await response.json()
            setData(data)
        }
        fetchData()
    },[])
    console.log(data);

    return (
        <div className=''>
            {
                data?.map(allPost => <AllPostedData key={allPost.id} allPost={allPost}/>)
            }
        </div>
    );
};

export default PostedData;