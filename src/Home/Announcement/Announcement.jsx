import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../component/LoadnigSpiner';
import AllAnnouncement from './AllAnnouncement';
import useAxiosCommon from '../../customsHooks/useAxiosCommon';

const Announcement = () => {
    const axiosCommon = useAxiosCommon();

    const { data: announcementData = [], isLoading } = useQuery({
        queryKey: ['announcementData'],
        queryFn: async () => {
            const { data } = await axiosCommon.get('/announcementData');
            console.log(data);
            return data;
        }
    })
    if (isLoading) return <LoadingSpinner />

    return (
        <>

            {
                announcementData && announcementData > 0 ?

                    <div className='text-center my-10' >
                        <div className='text-2xl font-bold'>
                            No Posted Announcement!
                        </div>
                    </div>

                    :

                    <>
                        <div className='text-center my-10' >
                            <div className='divider text-2xl font-bold'>
                                Hey Developer! HOt Announcement!
                            </div>
                        </div>
                        <div className='grid items-center md:grid-cols-2 '>
                            {
                                announcementData.map(announcement => <AllAnnouncement key={announcement._id} announcement={announcement}/>)
                            }
                        </div>
                    </>

            }
        </>
    );
};

export default Announcement;