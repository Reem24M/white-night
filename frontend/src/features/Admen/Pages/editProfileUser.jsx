import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const EditProfile = () => {
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', _id: '' });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get('https://your-domain.com/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setForm(res.data))
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://your-domain.com/user/${form._id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Profile Updated!");
    } catch { toast.error("Update failed"); }
  };

  const inputStyle = "w-full border border-gray-100 bg-gray-50 p-3 rounded-2xl focus:border-[#D4AF37] outline-none font-bold italic text-sm";

  return (
    <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] border p-10 mt-10 italic shadow-sm">
      <h2 className="text-2xl font-black uppercase text-center mb-8 underline decoration-[#D4AF37]">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-[10px] uppercase font-black text-gray-400 ml-2">Full Name</label>
          <input className={inputStyle} value={form.fullname} onChange={e => setForm({...form, fullname: e.target.value})} />
        </div>
        <div>
          <label className="text-[10px] uppercase font-black text-gray-400 ml-2">Email Address</label>
          <input className={inputStyle} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        </div>
        <div>
          <label className="text-[10px] uppercase font-black text-gray-400 ml-2">Phone Number</label>
          <input className={inputStyle} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
        </div>
        <button type="submit" className="w-full bg-[#D4AF37] text-white p-4 rounded-2xl font-black uppercase shadow-lg shadow-[#D4AF37]/20">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;