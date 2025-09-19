import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/home.jsx";
import TrendingCourses from "./components/TrendingCourses.jsx";
import YouTubeVideos from "./components/Api.jsx";
import BookSearch from "./components/Booksearch.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Explore from "./pages/Explore.jsx";
import ContactUs from "./components/ContactUs.jsx";
import RoleBasedDashboard from "./components/RoleBasedDashboard.jsx";
import coursesData from "./utils/CourseData.js";
import CoursePage from "./pages/CoursePage.jsx";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

function CoursesWrapper() {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === id);
  return course ? <CoursePage course={course} /> : <h1>Course Not Found</h1>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/ContactUs"
            element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route path="/course/:id" element={<CoursesWrapper />} />
          <Route
            path="/trending"
            element={
              <ProtectedRoute>
                <TrendingCourses />
                <ContactUs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
              <RoleBasedDashboard />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

