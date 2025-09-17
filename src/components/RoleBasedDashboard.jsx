import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

function RoleBasedDashboard() {
  const { user } = useAuth();
  const [inputValue, setInputValue] = useState(""); // not undefined

  if (!user) {
    return <p>Loading...</p>;
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard />;
    case "instructor":
      return <TeacherDashboard />;
    case "student":
      return <StudentDashboard />;
    default:
      return <p>No dashboard available for this role.</p>;
  }
}

export default RoleBasedDashboard;
