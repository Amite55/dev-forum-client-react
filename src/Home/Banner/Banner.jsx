import React from 'react';

const Banner = () => {
    return (
        <div
        className="hero min-h-96"
        style={{
          backgroundImage: "url(https://i.ibb.co/fryCtPm/banner-Wev3.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <input type="text" name="" className='w-4/6 md:w-96 rounded-md' id="" />
          </div>
        </div>
      </div>
    );
};

export default Banner;