import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PersonIcon from '../icons/PersonIcon'
import EmailIcon from '../icons/EmailIcon'
import PhoneIcon from '../icons/PhoneIcon'
import PasswordIcon from '../icons/PasswordIcon'

function Signup() {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [number, setnumber] = useState()

    const navigate = useNavigate()
    
    const handlesubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register', {name, email,number, password})
        .then(result => {console.log(result)
            navigate('/login')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-2xl p-8 space-y-6'>
        <h2 className='text-3xl font-bold text-center text-gray-800 tracking-wide'>
          Welcome to Learnify
        </h2>
        <form className='space-y-5' onSubmit={handlesubmit}>
          <div className='space-y-2'>
            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PersonIcon className="h-5 w-5 text-gray-400" />
              </div>
            <input 
              type="text" 
              id="name"
              name='name'
              placeholder='Enter your name'
              className='w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] outline-none transition duration-150'
              onChange={(e)=>setname(e.target.value)}
            />
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EmailIcon className="h-5 w-5 text-gray-400" />
              </div>
            <input 
              type="email" 
              id="email"
              name='email'
              placeholder='Enter your email'
              className='w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] outline-none transition duration-150'
              onChange={(e)=>setemail(e.target.value)}
            />
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor="number" className='block text-sm font-medium text-gray-700'>
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-gray-400" />
              </div>
            <input type="number"
            id='number'
            name='number'
            placeholder='Enter your phone number'
            className='w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] outline-none transition duration-150'
              onChange={(e)=>setnumber(e.target.value)}
             />
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PasswordIcon className="h-5 w-5 text-gray-400" />
              </div>
            <input 
              type="password"
              id="password" 
              name='password'
              placeholder='Enter your password'
              className='w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B3C53] focus:border-[#1B3C53] outline-none transition duration-150'
              onChange={(e)=>setpassword(e.target.value)}
            />
            </div>
          </div>

          <button 
            type='submit' 
            className='w-full bg-[#1B3C53] text-white py-2 px-4 rounded-md hover:bg-[#0E2148] focus:outline-none focus:ring-2 focus:ring-[#1B3C53] focus:ring-offset-2 transition duration-150 font-medium'
          >
            Sign Up
          </button>
        </form>
        <hr className='border-gray-400' />

        <p className='text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-[#1B3C53] hover:text-[#0E2148] font-medium'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
