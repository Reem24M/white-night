import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get('https://your-domain.com/owner/requests', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(data.requests);
    } catch (err) { toast.error("Failed to load requests"); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleDecision = async (id, decision) => {
    try {
      await axios.patch(`https://your-domain.com/owner/requests/${id}/${decision}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Request ${decision}ed!`);
      fetchRequests();
    } catch { toast.error("Action failed"); }
  };

  return (
    <div className="animate-in fade-in duration-500 italic">
      <h1 className="text-2xl font-black uppercase mb-6 underline decoration-[#D4AF37] decoration-4">Owner Applications</h1>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400">
            <tr><th className="p-5">User</th><th className="p-5">Hall</th><th className="p-5 text-right">Actions</th></tr>
          </thead>
          <tbody className="text-sm font-bold">
            {requests.map(req => (
              <tr key={req._id} className="border-b border-gray-50">
                <td className="p-5">{req.user?.fullname}</td>
                <td className="p-5 text-gray-500 uppercase">{req.name}</td>
                <td className="p-5 flex justify-end gap-2">
                  <button onClick={() => handleDecision(req._id, 'approve')} className="bg-black text-white px-4 py-2 rounded-xl text-[10px] uppercase font-black">Approve</button>
                  <button onClick={() => handleDecision(req._id, 'reject')} className="border text-red-500 px-4 py-2 rounded-xl text-[10px] uppercase font-black">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;