import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import hero from '../assets/HERO.jpg';
import Footer from './Footer';
import { BookOpen, BarChart2, Video, Smartphone, Users, Award, Sparkles, Shield, Star } from "lucide-react";
import { GoArrowRight } from "react-icons/go";


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

  const stats=[
    {
      title: "10K+", desc: "Active Students",
      icon: <Users className="w-15 h-15 text-blue-600" /> 
    },
    {
      title: "500+", desc: "Courses Available",
      icon: <BookOpen className="w-15 h-15 text-green-600" />
    },
    {
      title: "24/7", desc: "Support Available",
      icon: <Sparkles className="w-15 h-15 text-pink-600" />
    }
  ]

  const data =[
     {
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=500&auto=format&fit=crop&q=60",
      name: "Generative AI",
      description: "Learn to build AI-powered apps and workflows using AI's like ChatGPT and large language models.",
      rating: "5.0",
    },
    {
      image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGF0YSUyMHNjaWVuY2V8ZW58MHx8MHx8fDA%3D",
      name: "Data Science & Analytics",
      description: "Learn data wrangling, visualization, and statistical modeling for decision-making.",
      rating: "4.7",
    },
    {
      image: "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UHJvZ3JhbW1pbmclMjBGb3VuZGF0aW9ucyUyMChEU0ElMjAlMjYlMjBPT1ApfGVufDB8fDB8fHww",
      name: "Programming Foundations (DSA & OOP)",
      description: "Strengthen problem-solving with data structures, algorithms, and core programming concepts.",
      rating: "5.0",
    },
    {
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvY2slMjBjaGFpbnxlbnwwfHwwfHx8MA%3D%3D",
      name: "Blockchain & Web3 Development",
      description: "Develop decentralized apps (dApps) and smart contracts on Ethereum/Solana.",
      rating: "4.5",
    },

  ]

  const slides = [
  "https://images.unsplash.com/photo-1532618500676-2e0cbf7ba8b8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvdXJzZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=1200&auto=format&fit=crop&q=60",
];

  const [current, setcurrent] = useState(0);

  useEffect(()=>{
    const interval = setInterval(() => {
      setcurrent((prev)=>(prev + 1) % slides.length);
    }, 3000);
    return ()=> clearInterval(interval);
  }, [slides.length]);

  return (
    <>
        <Navbar />
      <div className='bg-gray-100'>
        <div
          style={{ 
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
            
         }}
          className="flex mt-21 justify-start relative min-h-[580px] bg-cover bg-center bg-no-repeat md:items-start">
            {/* <div className="absolute inset-0 z-10 bg-black/50 md:bg-transparent"></div> */}
            <div className='w-140 mt-15 ml-10 '>
              <h1 className="relative z-10 mt-35 text-[20px] font-bold md:text-[50px] text-gray-900 sm:text-[40px]">
              LEARN ANYTIME, <span className='text-blue-700'>GROW ANYWHERE</span>
              </h1>
              <p className='text-gray-600 relative x-10 md:text-xl'>Join thousands of learner mastering new skills with our interactive learning platform. Start your journey today and unlock your potential.</p>

              <Link to='/register' className='bg-blue-500 text-white x-10 relative px-4 py-3 rounded-xl text-xl font-bold mt-10 hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-350'>Get Started</Link>
            </div>            
        </div>
         
         <div className='text-center mb-5 bg-white/100 py-30'>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools educators and students need for effective online learning
            </p>
          </div>
          <div className='Features grid grid-cols-1 md:grid-cols-3 relative z-10 bg-white p-15 w-[80%] mx-auto rounded-2xl shadow-[-1px_0px_19px_2px_rgba(0,_0,_0,_0.1)] mt-[-100px]'>
            {stats.map((val, idx) => (
              <div 
                key={idx} 
                className="text-center flex flex-col items-center relative">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {val.icon}
                </div>
          
                <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {val.title}
                </div>
             
                <div className="text-gray-500 text-sm">
                  {val.desc}
                </div>

                {/* vertical divider (only show if not last col) */}
                {idx !== stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[2px] bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>

          <div className='flex justify-center gap-10 flex-wrap m-10 place-content-stretch items-center'>
           
            {features.map((val, idx)=>(
              <div key={idx} className='w-110 bg-white h-65 shadow-[0px_0px_13px_0px_rgba(0,_0,_0,_0.1)] rounded-md text mt-10 p-5 hover:shadow-lg transition-shadow duration-300 ease-in-out'>
                <div className=''>{val.icon}</div>
                <h1 className='text-xl font-bold mt-5'>{val.title}</h1>
                <p className='mt-3'>{val.desc}</p>
              </div>
            ))}       
          </div>


          <div className='relative w-full h-[500px] overflow-hidden shadow-lg my-12'>
            {slides.map((img, index)=>(
              <div
                key = {index}
                className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === current ? "opacity-100" : "opacity-0"
                }`} >
                <img src={img} alt={`slide-${index}`} className='w-full h-full object-cover' />
              </div>
            ))}
        

            <div>
              <span className='absolute pl-10 pt-35 flex text-4xl font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]'>Trending Courses</span>
              <span className='absolute pl-10 pt-45 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]'>Discover the most in-demand courses, handpicked for your success.</span>
          <div className="absolute inset-0 flex items-center p-10 ">
            <Link to="/trending">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-xl font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition">
                Explore Courses
              </button>
            </Link>
          </div>
          </div>

          {/* Dots indicator */}
          <div className="absolute bottom-5 flex justify-center w-full gap-2">
            {slides.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  idx === current ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrent(idx)}
              ></div>
            ))}
            </div>
          </div>
          

        <div className='text-center bg-white p-5'>
          <div className='bg-green-200 w-[40%] text-[15px] md:w-[18%] md:text-[20px] sm:w-[30%]  items-center justify-center inline-flex rounded-4xl px-1 py-2 text-green-800 font-semibold'><Award className="w-5 h-5" /> Trusted Platform</div>
          <h1 className='text-4xl font-semibold mt-8'>Learn from Industry <span className='text-blue-500'>Experts</span></h1>
          <p className='opacity-80 mt-4 mb-5'>Our world-class instructors come from top companies and bring real-world experience to every lesson</p>
          <button className='bg-blue-500 text-white x-10 relative px-4 py-3 rounded-xl text-xl font-bold mt-10 hover:bg-blue-600 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-350'>Start Learning Today</button>
        </div>  

        <div className='text-center my-10 '> 
          <h1 className='text-4xl font-bold'>Trending <span className='text-blue-500'>Courses</span></h1>
          <p className='mt-2 opacity-80 font-semibold'>Join thousands of learners in our top-rated courses.</p>
        </div> 
        <div className="w-full flex flex-wrap gap-10 justify-center items-center p-7 mb-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-80 h-[450px] bg-white rounded-md flex flex-col shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-md"
              />
              <h3 className="font-bold p-2 text-xl">{item.name}</h3>
              <p className="pl-2 text-gray-600 tracking-tight font-medium">
                {item.description}
              </p>
              <div className="pr-6 pb-4 mt-auto flex justify-end gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-semibold">{item.rating}</span>
              </div>
              <button className="bg-blue-700 text-white px-5 py-2 m-4 rounded-md w-[90%] hover:bg-blue-800 transition">
                Explore Course
              </button>
            </div>
          ))}
          <div className='w-full flex mr-3 justify-end px-5 py-2'>
            <Link to='/trending' className='text-blue-600 hover:underline flex items-center gap-1 text-[18px]'>
              See More <GoArrowRight />
            </Link>
          </div>

          
        </div>
      <Footer />
      </div>
    </>
  );
}
