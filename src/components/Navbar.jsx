import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Hamburger from "hamburger-react";
import register from './Signup.jsx';

function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='bg-white  fixed w-full top-0 z-50 shadow-md left-0'>
      <nav>
        <div className='flex justify-between items-center px-6 py-3 '>
          <div className=' py-2 px-3 ml-0 md:ml-5 rounded-2xl'>
            <h1 className='text-[30px] font-bold text-blue-600 text-shadow-2xs'>Learnify</h1>
          </div>

          <div className='space-x-5 hidden md:flex font-semibold text-[#1B3C53] opacity-90'>
            <NavLink to='/' className={({isActive, isPending})=>
              isActive? "text-blue-600 font-bold" : isPending ? "text-gray-500" : "text-gray-800"
            }>Home</NavLink>
            <NavLink>Services</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Contact</NavLink>
          </div>

          <div className='space-x-3 hidden md:flex mr-5'>
            <NavLink to='/login' className='py-2 font-semibold'>Login</NavLink>
            <NavLink to='/register' className='bg-blue-600 py-2.5 px-6 rounded-4xl text-white font-semibold'>SignUp</NavLink>
          </div>

          {/* Hamburger shown only on mobile */}
          <div className='md:hidden'>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </div>
        {isOpen && (
          <>
            <div className='md:hidden  bg-white shadow-lg px-6 py-3 space-y-2 text-center font-semibold'>
            <hr className='opacity-20 w-[100%]' />
              <NavLink className="block">Home</NavLink>
              <NavLink className="block">Services</NavLink>
              <NavLink className="block">About</NavLink>
              <NavLink className="block">Contact</NavLink>
              <hr className='opacity-20 w-[100%]' />

              <NavLink className="block">Login</NavLink>
              <NavLink className=" p-2 bg-gradient-to-r from-[#1B3C53] to-[#2A5470] text-white font-bold rounded-md;">SignUp</NavLink>
             
             
            </div>
            <div className=''>
            
          </div>
          </>
        )}
      </nav>
    </div>
  )
}

export default Navbar
