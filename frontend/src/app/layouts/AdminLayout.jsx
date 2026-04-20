import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, Clock, Users, Settings, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18}/> },
    { name: 'Services', path: '/admin/services', icon: <Store size={18}/> },
    { name: 'Pending', path: '/admin/pending', icon: <Clock size={18}/> },
    { name: 'Users', path: '/admin/users', icon: <Users size={18}/> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50 italic">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col p-6 sticky top-0 h-screen">
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-light text-gray-800 tracking-tight">White Night</h2>
          <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.2em] font-bold">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-bold uppercase ${
                  isActive ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-gray-400 hover:bg-gray-50'
                }`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-50 pt-4 space-y-1">
          <NavLink to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-2xl text-xs font-bold uppercase">
            <Settings size={18}/> Settings
          </NavLink>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl text-xs font-bold uppercase">
            <LogOut size={18}/> Logout
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white p-4 border-b border-gray-100 flex justify-end items-center px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <span className="text-xs font-bold text-gray-700">{user.name || "Admin"}</span>
            <div className="w-8 h-8 bg-white border border-[#D4AF37] rounded-full flex items-center justify-center text-[#D4AF37] overflow-hidden">
               {user.img ? <img src={user.img} className="w-full h-full object-cover" /> : "A"}
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;