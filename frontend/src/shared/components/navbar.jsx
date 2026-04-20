import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // ✅ check login

  const linkClass =
    "text-gray-700 hover:text-black transition text-sm font-medium";

  const handleLogout = () => {
    localStorage.clear(); // ✅ remove everything
    setOpen(false);
    navigate("/login"); // redirect after logout
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

        {/* CTA Desktop */}
        <div className="hidden md:block">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-[#D4AF37] hover:bg-[#C19A2E] text-white px-6 py-2 rounded-full text-sm"
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
        className={`fixed top-1/2 right-4 -translate-y-1/2 w-72 bg-white shadow-2xl rounded-2xl z-50 transform transition-all duration-300 ${
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-6 pb-6">
          <Link onClick={() => setOpen(false)} to="/" className={linkClass}>
            Home
          </Link>

          <Link onClick={() => setOpen(false)} to="/services" className={linkClass}>
            Services
          </Link>

          <Link onClick={() => setOpen(false)} to="/about" className={linkClass}>
            About
          </Link>

          {token ? (
            <button
              onClick={handleLogout}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm w-fit"
            >
              Logout
            </button>
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