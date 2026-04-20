import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const Services = () => {
  const [halls, setHalls] = useState([]);
  const token = localStorage.getItem("token");

  const fetchHalls = async () => {
    try {
      const { data } = await axios.get('https://your-domain.com/halls');
      setHalls(data.halls);
    } catch { toast.error("Error loading halls"); }
  };

  useEffect(() => { fetchHalls(); }, []);

  const deleteHall = async (id) => {
    if(!window.confirm("Delete this hall?")) return;
    try {
      await axios.delete(`https://your-domain.com/halls/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Hall deleted");
      fetchHalls();
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div className="italic font-bold animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl uppercase font-black">Managed Services</h1>
        <button className="bg-[#D4AF37] text-white px-6 py-2 rounded-full text-xs uppercase font-black shadow-lg shadow-[#D4AF37]/20">Add New</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {halls.map(hall => (
          <div key={hall._id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm">
            <img src={hall.coverPhoto?.url} className="h-40 w-full object-cover" alt="" />
            <div className="p-5">
              <h3 className="uppercase text-gray-800">{hall.name}</h3>
              <p className="text-[10px] text-[#D4AF37] mb-4 uppercase">{hall.priceRange}</p>
              <button onClick={() => deleteHall(hall._id)} className="text-red-500 text-xs uppercase underline">Delete Venue</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;