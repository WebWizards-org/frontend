import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PasswordIcon from "../icons/PasswordIcon";
import EmailIcon from "../icons/EmailIcon";
import EyeIcon from "../icons/EyeIcon";
import EyeOffIcon from "../icons/EyeOffIcon";
import api from "../utils/axiosInstance";
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();

    let newerrors = {};
    if (!email) newerrors.email = "Email is required!";
    if (!password) newerrors.password = "Password is required!";

    seterrors(newerrors);
    if (Object.keys(newerrors).length > 0) return;

    try {
      console.debug("Login: sending", { email });
      const response = await api.post("/auth/login", { email, password });

      console.debug("Login response raw:", response);

      // guard if backend returned unexpected shape
      if (!response || !response.data) {
        seterrors({ general: "No response from server" });
        return;
      }

      const { token, user: respUser } = response.data || {};

      if (!token) {
        seterrors({
          general: response.data?.message || "Login failed: no token",
        });
        return;
      }

      // decode fallback if server didn't return user object
      const parseJwt = (t) => {
        try {
          const payload = t.split(".")[1];
          const padded = payload.replace(/-/g, "+").replace(/_/g, "/");
          const json = decodeURIComponent(
            atob(padded)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          return JSON.parse(json);
        } catch {
          return null;
        }
      };

      let userObj = respUser;
      if (!userObj && token) {
        const payload = parseJwt(token) || {};
        userObj = {
          id: payload.id || payload.sub || null,
          role: payload.role || "student",
          email: payload.email,
          name: payload.name,
        };
      }

      login(token, userObj);
      navigate("/");
    } catch (error) {
      console.error("Login request failed:", error);
      const msg =
        error?.response?.data?.message || error.message || "Login failed";
      seterrors({ general: msg });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide">
          Login to Learnify
        </h2>
        <form className="space-y-5" onSubmit={handlesubmit}>
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EmailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email} // controlled input ✅
                className={`w-full pl-10 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1B3C53] outline-none transition duration-150 
                  ${errors.email ? "border-red-600" : "border-gray-300"}`}
                onChange={(e) => setemail(e.target.value)}
                onFocus={() => seterrors((prev) => ({ ...prev, email: "" }))}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PasswordIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password} // controlled input ✅
                className={`w-full pl-10 pr-12 px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1B3C53] outline-none transition duration-150 
                  ${errors.password ? "border-red-500" : "border-gray-300"}`}
                onChange={(e) => setpassword(e.target.value)}
                onFocus={() => seterrors((prev) => ({ ...prev, password: "" }))}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#1B3C53] focus:ring-offset-2 transition duration-150 font-medium"
          >
            Sign In
          </button>
        </form>

        {errors.general && (
          <p className="text-center text-red-500 mt-2">{errors.general}</p>
        )}

        <hr className="border-gray-400" />

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
