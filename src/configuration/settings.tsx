import React, { useState, useEffect } from 'react';
import logo from '/logo.svg';
import './settings.css'
import TagsInput from './components/TagsInput'

function Settings() {
  const isChecked = localStorage.getItem('isChecked');

  return (
    <div className={`items-center w-auto h-[96vh] justify-center flex-col p-3 bg-slate-200 ${isChecked=='true' ? 'bg-gradient-to-l from-pink-500 to-orange-400' : 'border-slate-200'}`}>
      <div className={`items-center justify-center min-h-full flex-col bg-white`}>
          <img src={logo} alt="logo" className="h-[10vh] pt-20" />
          <h1 className='m-0 p-0'>FocusZone</h1>
          <p className='m-0 p-0'>Settings</p>
          <TagsInput/>
        <div className='flex items-center justify-center h-full'><a className="absolute font-light m-5 border-3 border-black bottom-0 p-10 hover:text-orange-500 inline-block h-auto w-auto text-xs text-slate-900" href="/">← Back to home</a></div>
      </div>
    </div>
  )
}

export default Settings