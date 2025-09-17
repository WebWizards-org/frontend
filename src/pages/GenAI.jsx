import React from 'react'
import { GoPeople } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


function GenAI() {
  return (
    <div className='bg-blue-50 pl-5 pt-5' style={{ fontFamily: 'Inter, sans-serif' }}>
      <h5 className='font-bold text-xs tracking-tight text-[#0f1e2e]'>Beginner to Advanced</h5>
      <h1 className='pt-5 text-4xl font-extrabold text-[#17324e]'>Your Complete Guide to Generative AI</h1>
      <h3 className='pt-3 text-gray-600 font-bold'>Zero to Generative AI Pro – Learn, Build, Innovate</h3>
      <div className="flex items-center gap-6 text-gray-600 tracking-tight font-medium">
      <span className="inline-block pt-5">
        4.8 (12,847 ratings)
      </span>
      <span className="flex items-center gap-2 pt-5">
        <GoPeople className="w-5 h-5" />
        45,623 students
      </span>
    </div>
    <h2 className='pt-5 font-bold text-2xl text-[#17324e]'>About this Course</h2>
    <p className="mt-4 text-gray-700 text-base leading-relaxed">
      Learn the fundamentals of Generative AI and how to build your own AI-powered applications. 
      Gain hands-on experience with GPT, and other cutting-edge tools in this practical bootcamp.
    </p>

    <h2 className='pt-5 font-bold text-2xl text-[#17324e]'>What You'll Learn</h2>


    </div>
  )
}

export default GenAI
