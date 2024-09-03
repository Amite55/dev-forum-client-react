import { useContext, useState } from "react";
import { SearchContext } from "../../SearchProvider/SearchProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../customsHooks/useAxiosCommon";


const Banner = () => {
  // const axiosCommon = useAxiosCommon();
  const {search, setSearch} = useContext(SearchContext);
  // const [searchText, setSearchText] = useState('');

     // fetch postedData all Data ============
  //    const { data: searchData = [], isLoading } = useQuery({
  //     queryKey: ['postedData', searchText],
  //     queryFn: async () => {
  //         const { data } = await axiosCommon.get(`/search/postedDta?search=${searchText}`);
  //         return data;
  //     },
  // });
  // input form value handle ============
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.search.value;
    // setSearchText(searchValue)
    setSearch(searchValue)
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
                placeholder='Search Tag Name'
                aria-label='Enter post tag'
              />

              <button 
              type='submit' className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
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