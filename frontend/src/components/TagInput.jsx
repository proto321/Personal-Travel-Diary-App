import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import { FaLocationDot } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState([])

    //it will remove all blank spaces
    const addNewTag = () => {
        if (inputValue.trim() !== "") {
            setTags([...tags, inputValue.trim()])
            setInputValue("")
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            addNewTag()
    }
    }

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }
  
    return (
    <div>
        {/* {JSON.stringify(tags)} */}
        {
            tags.length > 0 && (
                <div className='flex items-center gap-2 flex-wrap mt-2'>
                    {tags.map((tag, index) =>
                         (
                        <span
                         key={index}
                         className='flex items-center gap-2 text-sm text-green-600
                        bg-green-200/40 px-3 py-1 rounded-sm 
                        '>
                        <FaLocationDot className='text-sm ' />
                         {tag}

                         <button className='cursor-pointer' onClick={() => handleRemoveTag(tag)}>
                         <IoMdClose />
                         </button>
                        </span>
                    )
                    )}
                </div>
            )
        }

    <div className='flex items-center gap-4 mt-3'>
        <input
         type="text"
         value={inputValue}
         className='text-sm bg-transparent border border-slate-200 px3 py-2 rounded-sm
         outline-none'
         placeholder='Add Location'
         onChange={handleInputChange}
         onKeyDown={handleKeyDown}
        />

        <button className='w-8 h-8 flex items-center justify-center rounded-sm
        border border-green-500 hover:bg-green-500 cursor-pointer' onClick={addNewTag}>
            <IoMdAdd className=' text-2xl text-green-500 hover:text-white ' />
        </button>
    </div>
    </div>
  )
}
