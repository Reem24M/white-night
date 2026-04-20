import React, { useState } from 'react';

const PendingRequests = () => {
  // Static data for demonstration
  const [requests, setRequests] = useState([
    { id: 1, user: "Ahmed Hassan", email: "ahmed@test.com", hall: "Crystal Palace", city: "Qena" },
    { id: 2, user: "Sarah Ali", email: "sarah@test.com", hall: "Royal Rose", city: "Luxor" },
  ]);

  const removeReq = (id) => setRequests(requests.filter(r => r.id !== id));

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-800 italic">Pending Approvals</h1>
        <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold text-[10px]">Review owner requests</p>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
        <table className="w-full text-left italic">
          <thead className="bg-gray-50/50 text-[10px] uppercase font-black tracking-widest text-gray-400 border-b">
            <tr>
              <th className="p-6">User</th>
              <th className="p-6">Hall Name</th>
              <th className="p-6 text-center">Decision</th>
            </tr>
          </thead>
          <tbody className="text-sm font-bold divide-y divide-gray-50">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="p-6">
                  <p className="text-gray-800">{req.user}</p>
                  <span className="text-[10px] text-gray-400 font-normal">{req.email}</span>
                </td>
                <td className="p-6 text-[#D4AF37] uppercase tracking-tighter">{req.hall}</td>
                <td className="p-6">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => removeReq(req.id)} className="bg-gray-900 text-white px-5 py-2 rounded-xl text-[10px] uppercase font-black hover:bg-[#D4AF37] transition">Approve</button>
                    <button onClick={() => removeReq(req.id)} className="text-red-400 px-5 py-2 rounded-xl text-[10px] uppercase font-black hover:bg-red-50">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;