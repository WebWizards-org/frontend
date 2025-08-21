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
         