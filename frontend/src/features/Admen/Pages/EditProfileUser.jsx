import React, { useState } from 'react';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: 'Omnya',
    email: 'omnya@example.com',
    phone: '0123456789'
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm mt-10 border">
      <h2 className="text-xl font-bold mb-6 italic">Edit User Profile</h2>
      
      <form className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" name="username" value={formData.username}
            onChange={handleChange}
            className="border p-2.5 rounded-xl focus:ring-2 focus:ring-black outline-none" 
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" name="email" value={formData.email}
            onChange={handleChange}
            className="border p-2.5 rounded-xl border-red-300 focus:ring-2 focus:ring-red-100 outline-none" 
          />
          <p className="text-red-500 text-xs mt-1 italic font-bold uppercase">Invalid email format</p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            type="text" name="phone" value={formData.phone}
            onChange={handleChange}
            className="border p-2.5 rounded-xl focus:ring-2 focus:ring-black outline-none" 
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 font-bold italic">
          <button type="button" className="px-6 py-2 border rounded-xl hover:bg-gray-50 uppercase">Cancel</button>
          <button type="submit" className="px-6 py-2 bg-black text-white rounded-xl uppercase">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;