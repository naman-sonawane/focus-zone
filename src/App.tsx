import React, { useState, useEffect } from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Homepage from './home/homepage'
import Settings from './configuration/settings';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/settings' element={<Settings/>}/>
    </Routes>
  )
}

export default App