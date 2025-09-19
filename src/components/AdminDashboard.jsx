import React from "react";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  LogOut,
  Settings,
  Users,
  GraduationCap,
  BookOpen,
  CircleUser,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashCard from "./DashCard";

function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashData = [
    { title: "Total Students", value: "1400", change: "+12.5%", icon: Users },
    { title: "Instructors", value: "25", change: "+5%", icon: GraduationCap },
    { title: "Courses", value: "120", change: "+8%", icon: BookOpen },
  ];
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" active />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarItem icon={<Users size={20} />} text="Students" />
        <SidebarItem icon={<GraduationCap size={20} />} text="Instructor" />
        <SidebarItem icon={<BookOpen size={20} />} text="Courses" />
        <hr className="text-zinc-200" />
        <SidebarItem icon={<CircleUser size={20} />} text="Profile" />
        <SidebarItem
          icon={<LogOut size={20} />}
          text="Logout"
          onClick={handleLogout}
        />
      </Sidebar>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold">Welcome back, Admin</h1>

        {/* Graph Section */}

        {/* Small Bar Chart Section */}

        <p>Here's what's happening with your learning platform today.</p>
        {/* Admin-specific content goes here */}
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
       
      </main>
    </div>
  );
}

export default AdminDashboard;
