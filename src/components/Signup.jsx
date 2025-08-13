import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const [name, setname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const navigate = useNavigate()
    const handlesubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register', {name, email, password})
        .then(result => {console.log(result)
            navigate('/login')
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-2xl p-8 space-y-6'>
        <h2 className='text-3xl font-bold text-center text-gray-800 tracking-wide'>
          Create Account
        </h2>
        
        <form className='space-y-6' onSubmit={handlesubmit}>
          <div className='space-y-2'>
            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>
              Full Name
            </label>
            <input 
              type="text" 
              id="name"
              name='name'
              placeholder='Enter your name'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150'
              onChange={(e)=>setname(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input 
              type="email" 
              id="email"
              name='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150'
              onChange={(e)=>setemail(e.target.value)}

            />
          </div>

          <div className='space-y-2'>
            <label htmlFor="password" className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input 
              type="password"
              id="password" 
              name='password'
              placeholder='Enter your password'
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150'
              onChange={(e)=>setpassword(e.target.value)}
            />
          </div>

          <button 
            type='submit' 
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 font-medium'
          >
            Sign Up
          </button>
        </form>

        <p className='text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 hover:text-blue-700 font-medium'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
