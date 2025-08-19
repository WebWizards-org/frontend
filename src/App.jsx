import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Home from './components/home.jsx';
import TrendingCourses from './components/TrendingCourses.jsx';
import YouTubeVideos from './components/Api.jsx';
import BookSearch from './components/Booksearch.jsx';

function App() {

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='trending' element={<TrendingCourses/>}></Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
