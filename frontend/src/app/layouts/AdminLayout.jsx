import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

const AdminLayout = () => {
  // القائمة الجانبية (Sidebar)
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Services', path: '/admin/services', icon: '💍' },
    { name: 'Pending', path: '/admin/pending', icon: '⏳' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      {/* 1. Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-0 h-screen">
        {/* Logo Section */}
        <div className="p-6 mb-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">💍</div>
            <div>
              <h2 className="font-bold text-lg text-gray-800 leading-none">White_Night</h2>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                  ? 'bg-[#FFF0F0] text-[#FF4D4D]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer (Settings & Logout) */}
        <div className="p-4 border-t border-gray-50 space-y-1">
          <NavLink to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition">
            <span>⚙️</span> Settings
          </NavLink>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-xl transition">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">Omar Khalil</p>
              <p className="text-[10px] text-gray-400 uppercase">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold border border-indigo-100">
              OK
            </div>
          </div>
        </header>

        {/* Page Content Rendering */}
        <main className="p-8">
          {/* هنا صفحات الـ Dashboard والـ Users هتبان */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
