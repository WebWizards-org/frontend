import React from 'react'
import Sidebar, { SidebarItem } from "./Sidebar"; 
import { Home, LayoutDashboard, LogOut, MessageSquare, Settings } from "lucide-react";

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
        <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
        {/* Admin-specific content goes here */}
      </main>
    </div>
  )
}

export default StudentDashboard
