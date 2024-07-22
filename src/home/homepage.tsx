import React, { useState, useEffect } from 'react';
import logo from '/logo.svg';
import './homepage.css';
import Toggle from './components/Toggle';
import axios from 'axios';

function Homepage() {
  const [isChecked, setIsChecked] = useState(localStorage.getItem('isChecked') === 'true');

  useEffect(() => {
    sendStatus();
  }, [isChecked]);

  useEffect(() => {
    const blacklistedItem = localStorage.getItem('blacklisted');
    const blocked = blacklistedItem ? JSON.parse(blacklistedItem) : null;

    try {
      axios.post('http://localhost:2244/blocked', {
        blocked: blocked
      }).then((res) => {});
    } catch (e) {
      console.error(e);
    }
  }, []); // This useEffect runs only once on component mount

  function sendStatus() {
    try {
      axios.post('http://localhost:2244/status', {
        status: isChecked
      }).then((res) => {});
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    localStorage.setItem('isChecked', isChecked.toString());
  }, [isChecked]);

  return (
    <div className={`items-center w-auto h-[96vh] justify-center flex-col p-3 bg-slate-200 ${isChecked ? 'bg-gradient-to-l from-pink-500 to-orange-400' : 'border-slate-200'}`}>
      <div className={`items-center justify-center min-h-full flex-col bg-white`}>
        <div className='flex-col w-auto items-center justify-center h-full'>
          <img src={logo} alt="logo" className="h-[10vh] pt-20" />
          <h1 className='m-0 p-0'>FocusZone</h1>
          <p className='m-0 p-0'>Your AI-powered productivity tool.</p>
          <div className='flex items-center justify-center h-full'><Toggle isChecked={isChecked} setIsChecked={setIsChecked} /></div>
          <a href="/settings" className='pt-20'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6 hover:stroke-orange-500 relative bottom-0 transform transition duration-500 hover:rotate-90">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </a>

          <div className='flex items-center justify-center h-full'><a className="relative bottom-0 p-10 hover:text-orange-500 inline-block h-auto w-auto text-xs font-light text-slate-900" href="https://www.linkedin.com/in/naman-sonawane/" target="_blank">Made with ✨ by Naman Sonawane</a></div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
