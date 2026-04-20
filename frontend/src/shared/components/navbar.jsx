import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, Settings, LogOut, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false); // Mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(false); // User dropdown
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");
  
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const linkClass = "text-gray-700 hover:text-black transition text-sm font-medium";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-light text-gray-800">
          White Night
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/search" className={linkClass}>Services</Link>
          <Link to="/about" className={linkClass}>About</Link>
        </div>

        {/* User Actions / CTA Desktop */}
        <div className="hidden md:block">
          {token ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className=" cursor-pointer flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-all border border-gray-100"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37] bg-white">
                  {user.img ? (
                    <img src={user.img} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <User size={18} />
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-700 truncate max-w-[100px]">
                  {user.name || "User"}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl rounded-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
                  <Link 
                    to="/profile" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <hr className="my-1 border-gray-50" />
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#D4AF37] hover:bg-[#C19A2E] text-white px-6 py-2 rounded-full text-sm font-medium transition-all"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Overlay Blur */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`cursor-pointer fixed top-1/2 right-4 -translate-y-1/2 w-72 bg-white shadow-2xl rounded-2xl z-50 transform transition-all duration-300 ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-6 pb-6">
          {token && (
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
               <img src={user.img} className="w-10 h-10 rounded-full border border-[#D4AF37]" alt="" />
               <div>
                  <p className="text-sm font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-400">Welcome back</p>
               </div>
            </div>
          )}
          <Link onClick={() => setOpen(false)} to="/" className={linkClass}>Home</Link>
          <Link onClick={() => setOpen(false)} to="/search" className={linkClass}>Services</Link>
          <Link onClick={() => setOpen(false)} to="/about" className={linkClass}>About</Link>
          
          {token ? (
            <>
              <Link onClick={() => setOpen(false)} to="/profile" className={linkClass}>Profile</Link>
              <button
                onClick={handleLogout}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="mt-2 bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm w-fit"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;