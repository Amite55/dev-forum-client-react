import React from 'react';
import Banner from '../Banner/Banner';
import PostedData from '../PostedData/PostedData';
import Tags from '../TagList/Tags';

const Home = () => {
    return (
        <div>
          <Banner/>
          <Tags/>
          {/* annoucement */}
          <PostedData/>
        </div>
    );
};

export default Home;