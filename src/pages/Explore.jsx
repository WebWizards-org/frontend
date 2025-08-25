import React from "react";
import { Search, Star, ArrowRight, Clock } from "lucide-react";
import Card from "../components/Card";
const Explore = () => {
  const COURSES = [
    {
      id: 1,
      title: "Heurify: Coramral & Learning Ludint Forever!",
      author: "Laurencia Delarosa",
      rating: 4.8,
      ratingCount: 1240,
      level: "Beginner",
      hours: 12,
      category: "Design",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Howleoromin Trascultation: Dowenpling Rangeorrais!",
      author: "Ryuki Takara",
      rating: 4.7,
      ratingCount: 980,
      level: "Intermediate",
      hours: 9,
      category: "Development",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Martch Coursers: White Learning Surney Couses",
      author: "Rafaela Tevos",
      rating: 4.9,
      ratingCount: 2011,
      level: "All Levels",
      hours: 16,
      category: "Marketing",
      img: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Data Drift & Insight Surfing",
      author: "Imani Howell",
      rating: 4.6,
      ratingCount: 612,
      level: "Intermediate",
      hours: 10,
      category: "Data Science",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Foundations of Modern UI",
      author: "Jasper Nolan",
      rating: 4.5,
      ratingCount: 420,
      level: "Beginner",
      hours: 6,
      category: "Design",
      img: "https://images.unsplash.com/photo-1529336953121-ad716dc7d5f0?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Serverless with a Smile",
      author: "Mina Correa",
      rating: 4.2,
      ratingCount: 1108,
      level: "Advanced",
      hours: 14,
      category: "Development",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("Select");

  const countries = ["Price", "Rating", "Newest"];

  const handleSelect = (country) => {
    setSelected(country);
    setIsOpen(false);
  };
  return (
    <div>
      <section className="h-[30vw]">
        <div className="px-24 flex flex-col items-center h-full justify-center gap-5">
          <h1 className="text-5xl font-semibold text-[#000000] font-secondary]">
            Explore Courses
          </h1>
          <p>
            Empower your growth through engaging, real-world learning
            experiences.
          </p>
          <div className="relative inline-block w-[60vw]">
            <input
              type="search"
              name="search"
              placeholder="Search Courses"
              className="border-1 border-black py-3 pl-5 pr-35 rounded-full w-full"
            />
            <button className="absolute right-1 px-10 py-2 bg-[hsla(220,97%,58%,1)] text-white rounded-full top-[9%] cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="px-24">
        <div className="flex justify-end">
          <div className="flex flex-col w-44 text-sm relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              <span>{selected}</span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2 z-50">
                {countries.map((country) => (
                  <li
                    key={country}
                    className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                    onClick={() => handleSelect(country)}
                  >
                    {country}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <main className="px-2 md:px-4 lg:px-8 h-full mt-10">
        <section className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
          {COURSES.map((course) => (
            <Card
              title={course.title}
              author={course.author}
              rating={course.rating}
              level={course.level}
              img={course.img}
              hours={course.hours}
              category={course.category}
              key={course.id}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default Explore;
