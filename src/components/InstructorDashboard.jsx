import React, { useState } from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Users,
  BookOpen,
  CircleUser,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import DashCard from "./DashCard";
import CourseList from "./CourseList";

function InstructorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    if (user?._id) {
      navigate(`/user/${user._id}`);
    }
  };

  const dashData = [
    {
      title: "My Courses",
      value: "8",
      change: "+2 this month",
      icon: BookOpen,
    },
    { title: "Enrolled Students", value: "320", change: "+15", icon: Users },
    {
      title: "Messages",
      value: "12",
      change: "-1 unread",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeSection === "dashboard"}
          onClick={() => setActiveSection("dashboard")}
        />
        <SidebarItem
          icon={<BookOpen size={20} />}
          text="My Courses"
          active={activeSection === "courses"}
          onClick={() => setActiveSection("courses")}
        />
        <SidebarItem icon={<Users size={20} />} text="Students" />
        <SidebarItem icon={<MessageSquare size={20} />} text="Messages" />
        <hr className="text-zinc-200" />
        <Link to={user?._id ? `/user/${user._id}` : "#"} className="w-full">
          <SidebarItem icon={<CircleUser size={20} />} text="Profile" />
        </Link>
        <SidebarItem
          icon={<LogOut size={20} />}
          text="Logout"
          onClick={handleLogout}
        />
      </Sidebar>
      <main className="flex-1 p-6 bg-gray-50 ml-60 min-h-screen">
        {activeSection === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name || "Instructor"}
            </h1>
            <p>Here's your teaching overview and recent activity.</p>
            <div className="flex flex-wrap w-full gap-5 mt-10 ml-4">
              {dashData.map((data, index) => (
                <DashCard
                  key={index}
                  title={data.title}
                  value={data.value}
                  change={data.change}
                  Icon={data.icon}
                />
              ))}
            </div>
          </>
        )}
        {activeSection === "courses" && <CourseList />}
      </main>
    </div>
  );
}

export default InstructorDashboard;
