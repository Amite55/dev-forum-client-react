import React from 'react';
import Banner from '../Banner/Banner';
import TagList from '../TagList/TagList';
import PostedData from '../PostedData/PostedData';

const Home = () => {
    return (
        <div>
          <Banner/>
          <TagList/>
          {/* annoucement */}
          <PostedData/>
        </div>
    );
};

export default Home;