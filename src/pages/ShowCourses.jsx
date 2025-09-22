import React, { useState, useEffect } from "react";
import { Star, Clock } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/cookieUtils";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch courses and cart
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const coursesResponse = await fetch(
          "http://localhost:3001/api/allCourses"
        );
        const coursesData = await coursesResponse.json();

        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        } else if (coursesData && Array.isArray(coursesData.courses)) {
          setCourses(coursesData.courses);
        } else {
          setCourses([]);
        }

        // Fetch cart if user is logged in
        if (user) {
          try {
            const token = getToken();
            const cartResponse = await fetch(
              "http://localhost:3001/api/protected/cart",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (cartResponse.ok) {
              const cartData = await cartResponse.json();
              setCart(cartData);
            }
          } catch (cartError) {
            console.error("Error fetching cart:", cartError);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleAddToCart = async (course) => {
    if (!user) {
      alert("Please login to add courses to cart");
      return;
    }

    // Check if already in cart (frontend check)
    const courseInCart = cart.find((item) => item._id === course._id);
    console.log("Course in cart check:", {
      courseId: course._id,
      cartLength: cart.length,
      courseInCart: !!courseInCart,
      cartIds: cart.map((item) => item._id),
    });

    if (courseInCart) {
      alert("Course already in cart!");
      return;
    }

    try {
      const token = getToken();
      console.log("Token found:", token ? "Yes" : "No");
      console.log("User:", user);
      console.log("Course ID:", course._id);

      if (!token) {
        alert("Authentication token not found. Please login again.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/protected/cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Cart updated successfully:", data);
        setCart(data.cart);
        alert("Course added to cart!");
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);

        // If it's already in cart, refresh cart state from backend
        if (errorData.message === "Course already in cart") {
          // Refresh cart from backend to sync state
          const cartResponse = await fetch(
            "http://localhost:3001/api/protected/cart",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
            setCart(cartData);
          }
        }

        alert(errorData.message || "Failed to add course to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding course to cart: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <section className="px-24 py-10 flex flex-col items-center h-full justify-center gap-5 max-sm:px-2 max-md:px-10">
        <h1 className="text-5xl font-semibold text-[#000000] font-secondary text-center">
          Explore Courses
        </h1>
        <p className="text-center">
          Empower your growth through engaging, real-world learning experiences.
        </p>
        <div className="relative inline-block w-[60vw] max-md:w-full">
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
      </section>
      <section className="flex justify-between md:px-10 px-2 max-sm:flex-col max-md:gap-2">
        <div>
          <ul className="flex gap-1">
            <li className="px-1 md:px-2 md:py-1 border-1 border-black cursor-pointer max-md:text-sm">
              Web Development
            </li>
            <li className="px-1 md:px-2 md:py-1 border-1 border-black cursor-pointer max-md:text-sm">
              Science
            </li>
            <li className="px-1 md:px-2 md:py-1 border-1 border-black cursor-pointer max-md:text-sm">
              Tech
            </li>
            <li className="px-1 md:px-2 md:py-1 border-1 border-black cursor-pointer max-md:text-sm">
              Marketing
            </li>
          </ul>
        </div>
        <div>
          <select name="filters" id="filters">
            <option value="newest">Newest</option>
            <option value="mostrated">Most rated</option>
            <option value="mostrelevant">Most Relevant</option>
            <option value="priceasc">By price:asc</option>
            <option value="pricedesc">By price:desc</option>
          </select>
        </div>
      </section>
      <main className="px-1 md:px-4 lg:px-8 h-full mt-10">
        <section className="sm:grid lg:grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3 flex flex-wrap justify-center">
          {courses.length > 0 ? (
            courses.map((course, idx) => (
              <div
                key={course.image + idx}
                className="bg-white rounded-xl shadow-md flex flex-col mb-6"
              >
                {course.image && (
                  <img
                    src={`http://localhost:3001/images/${course.image}`}
                    alt={course.title || ""}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                )}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  {course.instructor && (
                    <p className="text-gray-600 text-sm mb-2">
                      by{" "}
                      <span className="font-semibold text-blue-600">
                        {course.instructor.name}
                      </span>
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <Star className="w-5 h-5 fill-yellow-500" />
                      {course.rating ?? 0}
                    </span>
                    <span className="text-blue-600 font-bold text-md">
                      ₹{course.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {course.hours ?? "N/A"} hrs</span>
                  </div>
                  {course.studentsEnrolled > 0 && (
                    <div className="text-gray-500 text-sm mt-1">
                      {course.studentsEnrolled} students enrolled
                    </div>
                  )}
                  <button
                    className="bg-blue-700 text-white px-5 py-2 mt-4 rounded-md w-full hover:bg-blue-800 transition"
                    onClick={() => handleAddToCart(course)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-12 w-full">
              No courses found
            </p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ShowCourses;
