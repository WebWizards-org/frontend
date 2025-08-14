import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import HERO2 from '../assets/HERO2.jpg';
export default function Home() {
  return (
    <>
      <Navbar />
      <div
        style={{
          backgroundImage: `url(${HERO2})`,
        }}
        className="flex flex-col items-center justify-center mt-19 relative min-h-[600px] bg-cover bg-center bg-no-repeat md:items-start">
          <div className='absolute inset-0 bg-black/50'></div>
          <div className='w-full md:text-start text-center md:w-[35%] md:ml-20'>
            <h1 className="relative z-10 text-white text-[28px] font-bold md:text-[50px] sm:text-[40px]">
            LEARN ANYTIME, <span className='text-blue-300'>GROW ANYWHERE</span>
            </h1>
            <p className='text-white/50 relative x-10'>Join thousands of learner mastering new skills with our interactive learning platform. Start your journey today and unlock your potential.</p>

            <button className='bg-blue-500 text-white x-10 relative px-4 py-3 rounded-xl text-xl font-bold mt-10 hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-350'>Get Started</button>
          </div>
        

      </div>
    </>
  );
}
