import React, { useState } from 'react';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';


const Banner = () => {
  const navigate = useNavigate();

  // input form value handle ============
  const handleSubmit = (e) => {
    e.preventDefault()
    const search = e.target.search.value;
    const currentQuery = {search: search}
    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery
    })
    navigate(url)
  }
  

    return (
        <div
        className="hero min-h-96"
        style={{
          backgroundImage: "url(https://i.ibb.co/fryCtPm/banner-Wev3.jpg)",
        }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-xl">
          <form onSubmit={handleSubmit}>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-cyan-400 focus-within:ring-cyan-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                placeholder='Search Post Title'
                aria-label='Enter post tag'
              />

              <button type='submit' className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
};

export default Banner;