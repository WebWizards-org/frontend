import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getToken } from "../utils/cookieUtils";

function Cart() {
  const [cart, setCart] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    setCart(saved ? JSON.parse(saved) : []);
    const bought = localStorage.getItem("purchasedCourses");
    setPurchased(bought ? JSON.parse(bought) : []);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((course) => course._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuy = () => {
    if (cart.length === 0 || !user?._id) return;
    const userId = user._id;
    const courseIds = cart.map((course) => course._id);

    fetch(`http://localhost:3001/api/protected/user/${userId}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ courseIds }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2000);
          // Move courses to purchased
          const updatedPurchased = [...purchased, ...cart];
          setPurchased(updatedPurchased);
          localStorage.setItem(
            "purchasedCourses",
            JSON.stringify(updatedPurchased)
          );
          setCart([]);
          localStorage.setItem("cart", JSON.stringify([]));
        }
        if (data.error) {
          alert("Error: " + data.error);
        }
      })
      .catch((err) => {
        alert("Network error: " + err.message);
      });
  };

  const total = cart.reduce(
    (sum, course) => sum + Number(course.price || 0),
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center py-10">
        <div className="max-w-6xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10">
          {/* Left: Cart Items */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center md:text-left">
              My Cart
            </h2>
            {showSuccess && (
              <div className="flex items-center justify-center mb-6 text-green-600 font-bold">
                <CheckCircle className="mr-2" /> Purchase Successful!
              </div>
            )}
            {cart.length > 0 ? (
              <div className="space-y-6">
                {cart.map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center justify-between border-b pb-4 mb-4"
                  >
                    <div>
                      <h3 className="font-bold text-lg">{course.title}</h3>
                      <p className="text-gray-600">{course.description}</p>
                      <span className="text-blue-600 font-bold">
                        ₹{course.price}
                      </span>
                    </div>
                    <button
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded font-semibold flex items-center gap-2"
                      onClick={() => handleRemove(course._id)}
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty.
              </p>
            )}
          </div>
          {/* Right: Billing Section */}
          <div className="w-full md:w-[400px] bg-blue-50 rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <h3 className="text-xl font-bold text-blue-700 mb-6 text-center">
              Billing Summary
            </h3>
            <div className="mb-4">
              {cart.map((course) => (
                <div
                  key={course._id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="font-semibold text-gray-700">
                    {course.title}
                  </span>
                  <span className="font-bold text-blue-700">
                    ₹{course.price}
                  </span>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-lg text-gray-700">Total</span>
              <span className="font-bold text-2xl text-blue-700">₹{total}</span>
            </div>
            <button
              className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full font-bold text-lg transition ${
                cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleBuy}
              disabled={cart.length === 0}
            >
              Buy Courses
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;
