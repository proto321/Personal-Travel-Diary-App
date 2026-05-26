//rafce
import React, { useState, useEffect } from 'react';
import { Navbar }  from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import TravelStoryCard from '../../components/TravelStoryCard';

const Home = () => {
    const [allStories, setAllstories] = useState([])

    console.log(allStories)

  // Get all travel stories
  // const getAllTravelStories = async () => {
  //   try{
  //     const response = await axiosInstance.get('/travel-story/get-all') 

  //     if (response.data && response.data.stories) {
  //       // setAllstories(response.data.stories);
  //       setAllstories(response.data.stories);

  //     }
  //   } catch (error) {
  //     console.log("Something went wrong. Please try again.");
  //   }
  // }
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get('/travel-story/get-all');
  
      console.log("API Response:", response.data);
  
      if (response.data) {
        setAllstories(response.data);
      }
  
    } catch (error) {
      console.log("Something went wrong. Please try again.");
    }
  }

  //Handle Edit Story
  const handleEdit = async (data) => {  }

  const handleViewStory = (data) => {  }

  const updateIsFavorite = async (data) => { }

  useEffect(() => {
    getAllTravelStories()

  return () => {}
}, [])
  
  return <>
  <Navbar />

  <div className='container mx-auto py-10'>
    <div className='flex gap-7'>
      <div className='flex-1'>
        {allStories.length > 0 ? (
          <div className='grid grid-cols-2'>
          {allStories.map((item) => {
            return (
              <TravelStoryCard key={item._id} 
              imageUrl={item.imageUrl} 
              title={item.title} 
              story={item.story} 
              date={item.visitedDate}
              visitedLocation={item.visitedLocation}
              isFavourite={item.isFavourite}
              onEdit={() => handleEdit(item)}
              onClick={() => handleViewStory(item)}
              onFavoriteClick={() => updateIsFavorite(item)}
              />
            )
          })}
          </div>
        ) : (
          <div>Empty Cards Here</div>
        )}
      </div>

      <div className='w-[320px]'></div>
    </div>
  </div>
  </>
}

export default Home;