import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); 
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    serviceType: ''
  });

  const [loading, setLoading] = useState(false);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:7000/auth/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: role,
          serviceType: role === 'owner' ? formData.serviceType : undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
       
        localStorage.setItem('token', data.token); 
        localStorage.setItem('user', JSON.stringify({
          fullname: data.user.fullname,
          email: data.user.email,
          phone: data.user.phone,
          role: data.user.role
        }));

        alert("Registration Successful!");
        navigate('/login');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-[900px] mx-auto min-h-[600px] font-sans relative">
      
      {/* Left Section */}
      <div className="md:w-1/2 relative hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          alt="Wedding Venue" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-10 text-white">
          <h2 className="text-3xl font-serif mb-2 tracking-wide uppercase leading-tight">THE HEART OF YOUR<br />CELEBRATION.</h2>
          <p className="text-[11px] font-light text-gray-300 opacity-90 leading-relaxed max-w-[85%]">
            Join thousands of happy couples and discover your Gleem venue.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col items-center justify-center relative">
        <h3 className="text-2xl font-serif mb-6 text-gray-900 tracking-wider uppercase">CREATE AN ACCOUNT</h3>

        {/* Account Type Selection */}
        <div className="flex w-full max-w-sm bg-[#F9F7F5] border border-gray-200 rounded-xl p-1 mb-6 shadow-inner">
          <button 
            type="button"
            onClick={() => setRole('owner')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'owner' ? 'bg-white shadow-sm text-gray-800 border border-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Owner
          </button>
          <button 
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${role === 'user' ? 'bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
          >
            User
          </button>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          {role === 'owner' && (
            <div className="animate-fadeIn">
              <label className="block text-[11px] font-semibold text-[#D4AF37] mb-1.5 ml-1 uppercase tracking-wider">Service Type</label>
              <select 
                name="serviceType"
                onChange={handleChange}
                required
                className="w-full bg-[#FDFBF9] border border-[#EADACC] px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] text-sm text-gray-700 appearance-none cursor-pointer shadow-sm"
              >
                <option value="">Select your business type</option>
                <option value="hall">Wedding Hall</option>
                <option value="organizer">Planning Company</option>
                <option value="photography">Photo Session</option>
                <option value="roof">Roof Venue</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Full Name</label>
            <input name="fullname" type="text" required onChange={handleChange} className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700" />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Email Address</label>
            <input name="email" type="email" required onChange={handleChange} className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700" />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#A88C5D]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <input name="phone" type="tel" required onChange={handleChange} className="w-full bg-[#F9F7F5] border border-gray-100 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#A88C5D] text-sm text-gray-700" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Password</label>
              <input name="password" type="password" required onChange={handleChange} placeholder="••••••••" className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] text-sm text-gray-700 placeholder-gray-400" />
            </div>
            <div className="w-1/2">
              <label className="block text-[11px] font-semibold text-gray-600 mb-1.5 ml-1">Confirm Password</label>
              <input name="confirmPassword" type="password" required onChange={handleChange} placeholder="••••••••" className="w-full bg-[#F9F7F5] border border-gray-100 px-4 py-3.5 rounded-xl outline-none focus:ring-1 focus:ring-[#D4AF37] text-sm text-gray-700 placeholder-gray-400" />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-gradient-to-r from-[#D4AF37] to-[#D4AF37] text-white py-3.5 rounded-xl font-medium shadow-md hover:opacity-90 transition-all text-sm tracking-wide mt-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
            </button>
          </div>
        </form>

        <p className="mt-5 text-[11px] text-gray-500 font-medium">
          Already have an account? <Link to="/login" className="text-[#D4AF37] hover:underline transition-colors">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;