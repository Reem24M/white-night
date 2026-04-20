import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get('https://your-domain.com/user', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data.users))
      .catch(() => toast.error("Error loading users"));
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden italic font-bold">
      <table className="w-full text-left">
        <thead className="bg-gray-50/50 text-[10px] uppercase font-black text-gray-400">
          <tr><th className="p-5">Full Name</th><th className="p-5">Role</th><th className="p-5">Email</th></tr>
        </thead>
        <tbody className="text-sm">
          {users.map(u => (
            <tr key={u._id} className="border-b border-gray-50">
              <td className="p-5 text-gray-800 uppercase">{u.fullname}</td>
              <td className="p-5"><span className="text-[#D4AF37] uppercase">{u.role}</span></td>
              <td className="p-5 text-gray-400 font-normal">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;