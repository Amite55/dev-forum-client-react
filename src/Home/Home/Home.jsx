import React from 'react';
import Banner from '../Banner/Banner';
import PostedData from '../PostedData/PostedData';
import Tags from '../TagList/Tags';
import Announcement from '../Announcement/Announcement';

const Home = () => {
    return (
        <div>
          <Banner/>
          <Announcement/>
          <Tags/>
          {/* annoucement */}
          <PostedData/>
        </div>
    );
};

export default Home;