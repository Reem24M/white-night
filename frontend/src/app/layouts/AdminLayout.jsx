import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AdminLayout = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Services', path: '/admin/services', icon: '💍' },
    { name: 'Pending', path: '/admin/pending', icon: '⏳' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col p-6 sticky top-0 h-screen">
        <div className="mb-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">💍</div>
          <div>
             <h2 className="font-bold text-lg leading-none">White_Night</h2>
             <span className="text-[10px] text-gray-400 uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                  isActive ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-50'
                }`
              }
            >
              <span>{item.icon}</span> {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t pt-4 space-y-1">
          <NavLink to="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl">
             ⚙️ Settings
          </NavLink>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition">
             🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white p-4 border-b flex justify-end items-center px-8">
           <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Omar Khalil</span>
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">OK</div>
           </div>
        </header>

        {/* Page Content */}
        <div className="p-4">
           <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;