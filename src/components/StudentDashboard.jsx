
import React, { useState } from 'react';
import Sidebar, { SidebarItem } from "./Sidebar";
import { Home, LayoutDashboard, LogOut, MessageSquare, Settings } from "lucide-react";
import DashCard from './DashCard';

function StudentDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className='flex'>
      <Sidebar>
        <SidebarItem
          icon={<Home size={20} />}
          text="Home"
          active={activeSection === "home"}
          onClick={() => setActiveSection("home")}
        />
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
          active={activeSection === "dashboard"}
          onClick={() => setActiveSection("dashboard")}
        />
        <SidebarItem
          icon={<MessageSquare size={20} />}
          text="Messages"
          active={activeSection === "messages"}
          alert
          onClick={() => setActiveSection("messages")}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={activeSection === "settings"}
          onClick={() => setActiveSection("settings")}
        />
        <SidebarItem
          icon={<LogOut size={20} />}
          text="Logout"
          active={activeSection === "logout"}
          onClick={() => setActiveSection("logout")}
        />
      </Sidebar>
      <main className="flex-1 p-6 pl-65 bg-gray-50 min-h-screen">
        {activeSection === "home" && (
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Student</h1>
            <p>Here's what's happening with your learning platform today.</p>
          </div>
        )}
        {activeSection === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <div className="flex flex-wrap w-full gap-5 mt-10">
              <DashCard title="Courses Enrolled" value="5" change="+1" Icon={Home} />
              <DashCard title="Messages" value="2" change="0" Icon={MessageSquare} />
              <DashCard title="Progress" value="80%" change="+10%" Icon={LayoutDashboard} />
            </div>
          </div>
        )}
        {activeSection === "messages" && (
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p>No new messages.</p>
          </div>
        )}
        {activeSection === "settings" && (
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p>Update your profile and preferences here.</p>
          </div>
        )}
        {activeSection === "logout" && (
          <div>
            <h1 className="text-3xl font-bold">Logout</h1>
            <p>Click here to logout from your account.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
