import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import hero from '../assets/HERO.jpg';
import Footer from './Footer';
import { BookOpen, BarChart2, Video, Smartphone, Users, Award, Sparkles, Shield } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="w-15 h-15 text-blue-600" />,
      title: "Interactive Courses",
      desc: "Learn with engaging videos, quizzes, and projects that simplify complex concepts.",
    },
    {
      icon: <BarChart2 className="w-15 h-15 text-green-600" />,
      title: "Progress Tracking",
      desc: "Stay motivated with dashboards, badges, and milestones that show your growth.",
    },
    {
      icon: <Video className="w-15 h-15 text-purple-600" />,
      title: "Live Classes & Webinars",
      desc: "Join expert-led sessions, ask questions in real-time, and watch recordings anytime.",
    },
    {
      icon: <Smartphone className="w-15 h-15 text-pink-600" />,
      title: "Mobile Learning",
      desc: "Access your courses on phone, tablet, or laptop—learn anytime, anywhere.",
    },
    {
      icon: <Users className="w-15 h-15 text-orange-600" />,
      title: "Community Support",
      desc: "Connect with peers, share ideas, and learn together in active discussion forums.",
    },
    {
      icon: <Award className="w-15 h-15 text-yellow-600" />,
      title: "Assessments & Certifications",
      desc: "Test your skills with quizzes and earn certificates that boost your career.",
    }
  ]

  return (
    <>
        <Navbar />
        <div
          style={{ 
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
            
         }}
          className="flex  mt-21 justify-start relative min-h-[580px] bg-cover bg-center bg-no-repeat md:items-start">
            {/* <div className="absolute inset-0 z-10 bg-black/50 md:bg-transparent"></div> */}
            <div className='w-180 mt-15 ml-10 bg-amber-'>
              <h1 className="relative z-10 mt-15 text-[20px] font-bold md:text-[70px] text-gray-900 sm:text-[40px]">
              LEARN ANYTIME, <span className='text-blue-700'>GROW ANYWHERE</span>
              </h1>
              <p className='text-gray-600 relative x-10 md:text-xl'>Join thousands of learner mastering new skills with our interactive learning platform. Start your journey today and unlock your potential.</p>

              <button className='bg-blue-500 text-white x-10 relative px-4 py-3 rounded-xl text-xl font-bold mt-10 hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-350'>Get Started</button>
            </div>            
        </div>
        <br />
          
          <div className='text-center mt-10 mb-5'>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools educators and students need for effective online learning
            </p>
          </div>
          <div className='flex justify-center gap-10 flex-wrap m-10 place-content-stretch items-center'>
           
            {features.map((val, idx)=>(
              <div key={idx} className='w-110 h-65 shadow-[0px_0px_13px_0px_rgba(0,_0,_0,_0.1)] rounded-md text mt-10 p-5 hover:shadow-lg transition-shadow duration-300 ease-in-out'>
                <div className=''>{val.icon}</div>
                <h1 className='text-xl font-bold mt-5'>{val.title}</h1>
                <p className='mt-3'>{val.desc}</p>
              </div>
            ))}       
          </div>

        <div className='text-center bg-gray-100 p-5'>
          <div className='bg-green-200 w-[11%] items-center justify-center inline-flex rounded-4xl px-1 py-2 text-green-800'><Award className="w-5 h-5" /> Trusted Platform</div>
          <h1 className='text-4xl font-semibold mt-8'>Learn from Industry <span className='text-blue-500'>Experts</span></h1>
          <p className='opacity-80 mt-4 mb-5'>Our world-class instructors come from top companies and bring real-world experience to every lesson</p>
          <button className='bg-blue-500 text-white x-10 relative px-4 py-3 rounded-xl text-xl font-bold mt-10 hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-350'>Start Learning Today</button>
        </div>  
        <br />
      <Footer />
    </>
  );
}
