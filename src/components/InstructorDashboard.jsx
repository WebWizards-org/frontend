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

function InstructorDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const dashData = [
    { title: "My Courses", value: "8", change: "+2 this month", icon: BookOpen },
    { title: "Enrolled Students", value: "320", change: "+15", icon: Users },
    { title: "Messages", value: "12", change: "-1 unread", icon: MessageSquare },
  ];

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" active />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarItem icon={<BookOpen size={20} />} text="My Courses" />
        <SidebarItem icon={<Users size={20} />} text="Students" />
        <SidebarItem icon={<MessageSquare size={20} />} text="Messages" />
        <hr className="text-zinc-200" />
        <SidebarItem icon={<CircleUser size={20} />} text="Profile" />
        <SidebarItem
          icon={<LogOut size={20} />}
          text="Logout"
          onClick={handleLogout}
        />
      </Sidebar>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold">Welcome back, Instructor</h1>
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
      </main>
    </div>
  );
}

export default InstructorDashboard;
