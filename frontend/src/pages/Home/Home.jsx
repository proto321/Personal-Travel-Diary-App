//rafce
import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';

const Home = () => {
    const [allStories, setAllstories] = useState([])

    console.log(allStories)

  // Get all travel stories
  const getAllTravelStories = async () => {
    try{
      const response = await axiosInstance.get('/travel-story/get-all') 

      if (response.data && response.data.stories) {
        // setAllstories(response.data.stories);
        setAllstories(response.data.stories);

      }
    } catch (error) {
      console.error("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    getAllTravelStories()

  return () => {}
}, [])
  
  return <>
  <Navbar />

  <div className='container mx-auto py-10'>
    <div className='flex gap-7'>
      <div className='flex-1'></div>

      <div className='w-[320px]'></div>
    </div>
  </div>
  </>
}

export default Home;