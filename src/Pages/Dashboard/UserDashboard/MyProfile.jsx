import React from 'react';
import Profile from '../Profile/Profile';
import PostedData from '../../../Home/PostedData/PostedData';

const MyProfile = () => {
    return (
        <div>
            <Profile/>

            {/* <AllPostedData/> */}
            <PostedData/>
        </div>
    );
};

export default MyProfile;