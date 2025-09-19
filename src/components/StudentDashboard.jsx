import React from 'react'
import Sidebar, { SidebarItem } from "./Sidebar"; 
import { Home, LayoutDashboard, LogOut, MessageSquare, Settings } from "lucide-react";
import DashCard from './DashCard';
function StudentDashboard() {
  return (
    <div className='flex'>
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" active />
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
        <SidebarItem icon={<MessageSquare size={20} />} text="Messages" alert />
        <SidebarItem icon={<Settings size={20} />} text="Settings" />
        <SidebarItem icon={<LogOut size={20} />} text="Settings" />
      </Sidebar>
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">
        <div className='bg-red'> 
          <h1 className="text-3xl font-bold">Welcome back, Student</h1>
          <p>Here's what's happening with your learning platform today.</p>
        </div>
        {/* Admin-specific content goes here */}
        <div className="flex flex-wrap w-full gap-5 mt-10">
          <DashCard />
          <DashCard />
          <DashCard />
        </div>
      </main>
    </div>
  )
}

export default StudentDashboard
