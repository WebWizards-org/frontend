import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/home.jsx";
import TrendingCourses from "./components/TrendingCourses.jsx";
import YouTubeVideos from "./components/Api.jsx";
import BookSearch from "./components/Booksearch.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Explore from "./pages/Explore.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Courses from "./pages/GenAI.jsx";
import GenAI from "./pages/GenAI.jsx";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/courses/genai" element={<GenAI />} />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <TrendingCourses />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
