import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();

  // Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!user) {
          setCart([]);
          setLoading(false);
          return;
        }

        const res = await axiosInstance.get("/protected/cart");
        setCart(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    } else {
      // ensure loading is false when no user
      setLoading(false);
    }
  }, [user]);

  const handleRemove = async (courseId) => {
    try {
      const res = await axiosInstance.delete(`/protected/cart/${courseId}`);
      if (res.status === 200) {
        // backend returns updated cart
        setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
      } else {
        alert(res.data?.message || "Failed to remove course from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert(
        error?.response?.data?.message || "Error removing course from cart"
      );
    }
  };

  const handleBuy = async () => {
    if (cart.length === 0 || !user?.id) {
      console.log("Cannot buy: cart empty or no user", {
        cartLength: cart.length,
        userId: user?.id,
      });
      return;
    }

    const userId = user.id;
    const courseIds = cart.map((course) => course._id);

    console.log("Starting purchase process:", {
      userId,
      courseIds,
      cartLength: cart.length,
    });

    try {
      const res = await axiosInstance.post(
        `/protected/user/${userId}/purchase`,
        {
          courseIds,
        }
      );

      if (res.status === 200) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // fetch updated cart (backend should return cleared cart)
        try {
          const cartRes = await axiosInstance.get("/protected/cart");
          setCart(Array.isArray(cartRes.data) ? cartRes.data : []);
        } catch (err) {
          console.error("Failed to fetch updated cart:", err);
          setCart([]);
        }
      } else {
        alert(res.data?.message || "Purchase failed");
      }
    } catch (error) {
      console.error("Network error during purchase:", error);
      alert(
        error?.response?.data?.message || "Network error: " + error.message
      );
    }
  };

  const total = cart.reduce(
    (sum, course) => sum + Number(course.price || 0),
    0
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center py-10">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your cart...</p>
            </div>
          </div>
        ) : (
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
                        <p className="text-gray-600 text-sm">
                          {course.description && course.description.length > 100
                            ? `${course.description.substring(0, 100)}...`
                            : course.description}
                        </p>
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
                <span className="font-bold text-2xl text-blue-700">
                  ₹{total}
                </span>
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
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
