import React from 'react';

interface SaveProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Save: React.FC<SaveProps> = ({ onClick }) => {
  return (
    <div className='pt-4' onClick={onClick}>
      <a
        className="relative rounded px-5 py-2.5 overflow-hidden group bg-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-orange-400 transition-all ease-out duration-300"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" />
        <span id='saveText' className="relative text-white">Save</span>
      </a>
    </div>
  );
};

export default Save;