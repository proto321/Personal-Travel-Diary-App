//rafce
import React, { useState, useEffect } from 'react';
import { Navbar }  from '../../components/Navbar';
import axiosInstance from '../../utils/axiosInstance';
import TravelStoryCard from '../../components/TravelStoryCard';
import { ToastContainer, toast } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import Modal from 'react-modal';
import { AddEditTravelStory } from '../../components/AddEditTravelStory';
import { ViewTravelStory } from './ViewTravelStory';
import EmptyCards from '../../components/EmptyCards';
import { DayPicker } from 'react-day-picker';
import moment from 'moment';
import FilterInfoTitle from '../../components/FilterInfoTitle';
import { getEmptyCardMessage } from '../../utils/helper';

const Home = () => {
    const [allStories, setAllstories] = useState([])

    const [searchQuery, setSearchQuery] = useState("")

    const [filterType, setFilterType] = useState() 

    const [dateRange, setDateRange] = useState({ from: null, to: null })

    // console.log(allStories)

    const [openAddEditModal, setOpenAddEditModal] = useState({
      isShown: false,
      type: "add",
      data: null,
    })

    const [openViewModal, setOpenViewModal] = useState({
      isShown: false,
      data: null,
    })

  // Get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get(
        "/travel-story/get-all");
  
      console.log("API Response:", response.data);
  
      // if (response.data && response.data.stories) {
      //   setAllStories(response.data.stories)
      // }
  
      if (response.data) {
        setAllstories(response.data);
      }
  
    } catch (error) {
      console.log("Something went wrong. Please try again.");
    }
  }

  //Handle Edit Story
  const handleEdit = async (data) => {
     setOpenAddEditModal({
       isShown: true, 
       type: "edit", 
       data 
      })
    }

  const handleViewStory = (data) => { 
    setOpenViewModal({ isShown: true, data })
   }

  const updateIsFavorite = async (storyData) => {
    const storyId = storyData._id

    try {
      const response = await axiosInstance.put(
        "/travel-story/update-is-favorite/"+storyId,
     {
        isFavorite: !storyData.isFavorite,
      })

        if (response.data && response.data.story) {
            toast.success("Favorite status updated successfully!")
          getAllTravelStories()
        }
    } catch (error) {
      console.log("Something went wrong. Please try again.");
    }
   }

   // Delete travel story
    const deleteTravelStory = async (data) => {
      const storyId = data._id
    
      try {
        const response = await axiosInstance.delete(
          "/travel-story/delete-story/" + storyId)
          
          if (response.data && !response.data.error) {
            toast.success("Story deleted successfully!")

            setOpenViewModal((prevState) => ({ ...prevState, isShown: false }))
           
            getAllTravelStories()
          }
      } catch (error) {
        console.log("Something went wrong. Please try again.");
      }
    };

    // Search story
    const onSearchStory = async(query) => {
      try {
        const response = await axiosInstance.get(
          "/travel-story/search", {
            params: {
              query: query,
            },
          })

          if (response.data && response.data.stories) {
            setFilterType("search")
            setAllstories(response.data.stories)
          }
      } catch (error) {
        console.log("Something went wrong. Please try again.");
      }
    }

    // Clear search
    const handleClearSearch = () => {
      setFilterType("")
      getAllTravelStories()
    }

    // Handle filter travel story by date range
    const filterStoriesByDate = async (day) => {
      try {
        const startDate = day.from ? moment(day.from).valueOf() : null

        const endDate = day.to ? moment(day.to).valueOf() : null

        if(startDate && endDate){
          const response = await axiosInstance.get(
            "/travel-story/filter", {
              params: { startDate, endDate }, 
            })

            if (response.data && response.data.stories) {
              setFilterType("date")
              setAllstories(response.data.stories)
            }
        }
      } catch (error) {
        console.log("Something went wrong. Please try again.");
      }
    }

    // Handle date range click
    const handleDayClick = (day) => {
      setDateRange(day)
      filterStoriesByDate(day)
    }

    const resetFilter = () => {
      setDateRange({ from: null, to: null })
      setFilterType("")
      getAllTravelStories()
    }


  useEffect(() => {
    getAllTravelStories()

  return () => {}
}, [])
  
  return <>
  <Navbar
   searchQuery={searchQuery} 
   setSearchQuery={setSearchQuery}
   onSearchNote={onSearchStory} 
   handleClearSearch={handleClearSearch}
    />

  <div className='container mx-auto py-10'>
    <FilterInfoTitle
     filterType={filterType} 
     filterDate={dateRange}
     onClear={() => {
      resetFilter()
    }}
    />

    <div className='flex gap-7'>
      <div className='flex-1'>
        {allStories.length > 0 ? (
          <div className='grid grid-cols-2 gap-6 '>
            {/*grid grid-cols-2 gap-6*/}
            {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
          {allStories.map((item) => {
            return (
              <TravelStoryCard key={item._id} 
              imageUrl={item.imageUrl} 
              title={item.title} 
              story={item.story} 
              date={item.visitedDate}
              visitedLocation={item.visitedLocation}
              isFavorite={item.isFavorite}
              onEdit={() => handleEdit(item)}
              onClick={() => handleViewStory(item)}
              onFavoriteClick={() => updateIsFavorite(item)}
              />
            )
          })} 
          </div>
        ) : (
          <EmptyCards imgSrc={"https://images.pexels.com/photos/5706021/pexels-photo-5706021.jpeg"
        }
        message={getEmptyCardMessage(filterType)}
        setOpenAddEditModal={() =>
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          })}
        />
        )}
      </div>

      <div className='w-[320px]'></div>
          <div className='bg-white border border-slate-200 shadow-lg
          shadow-slate-200/60 rounded-lg'>
            <div className='p-3'>
              <DayPicker
               captionLayout='dropdown' 
               mode='range'
               selected={dateRange}
               onSelect={handleDayClick}
               pagedNavigation
               />
            </div>
          </div>
    </div>
  </div>

  {/* Add & Edit Travel Story Modal */}

  <Modal
    isOpen={openAddEditModal.isShown}
    onRequestClose={() => {}}
    style={{
      overlay: {
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 999,
      },
    }}
    appElement={document.getElementById("root")}
    className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto
    mt-14 p-5 overflow-y-scroll scrollbar z-50;"
    >
      <AddEditTravelStory
       storyInfo={openAddEditModal.data}
       type={openAddEditModal.type}
       onClose={() => {
        setOpenAddEditModal({ isShown: false, type: "add", data: null })
       }}
       getAllTravelStories={getAllTravelStories}
      />
    </Modal>

    {/* View travel story modal */}
    <Modal
    isOpen={openViewModal.isShown}
    onRequestClose={() => {}}
    style={{
      overlay: {
        backgroundColor: "rgba(0,0,0,0.2",
        zIndex: 999,
      },
    }}
    appElement={document.getElementById("root")}
    className="w-[80vw] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto
    mt-14 p-5 overflow-y-scroll scrollbar z-50"
    >
      <ViewTravelStory 
        storyInfo={openViewModal.data || null}
        onClose={() => {
          setOpenViewModal((prevState) => ({ ...prevState, isShown: false}))
        }}
        onEditClick={() => {
          setOpenViewModal((prevState) => ({ ...prevState, isShown: false}))
          handleEdit(openViewModal.data || null)
        }}
        onDeleteClick={() => {
          deleteTravelStory(openViewModal.data || null)
        }}
      />
    </Modal>


  <button className='w-16 h-16 flex items-center justify-center rounded-full
  bg-green-500 hover:bg-green-400 fixed right-10 bottom-10 cursor-pointer'
  onClick={() => {
    setOpenAddEditModal({ isShown: true, type: "add", data: null })
  }}
  >
    
    <IoMdAdd className='text-[32px] text-white' />
  </button>

  <ToastContainer />
  </>
}

export default Home;