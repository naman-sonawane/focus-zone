import React, { useState } from 'react';

const Toggle: React.FC<{ isChecked: boolean, setIsChecked: React.Dispatch<React.SetStateAction<boolean>> }> = ({ isChecked, setIsChecked }) => {

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <>
      <div className='pt-8'>
        <label className="relative flex items-center mb-5 cursor-pointer">
          <input
            type="checkbox"
            defaultValue=""
            className="sr-only peer"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          <div className="w-11 h-6 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-transparent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-l from-pink-500 to-orange-400 hover:peer-checked:bg-pink-500" />
          <span className="ml-3 text-sm font-medium text-gray-600">Focus</span>
        </label>
      </div>
    </>
  );
}

export default Toggle;