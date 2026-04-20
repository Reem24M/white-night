import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({ services: 0, users: 0 });
  const [pendingServices, setPendingServices] = useState([]);

  useEffect(() => {
    // هنا هتحطي الـ Fetch بتاعك من الباك إند
    // Example: axios.get('/admin/stats').then(res => setStats(res.data))
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400">Total Services</p>
          <h2 className="text-3xl font-bold">{stats.services || '1,284'}</h2>
          <span className="text-green-500 text-sm">↑ +12% from last month</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-gray-400">Active Users</p>
          <h2 className="text-3xl font-bold">{stats.users || '45.2k'}</h2>
          <span className="text-green-500 text-sm">↑ +8% from last month</span>
        </div>
      </div>

      {/* Pending Services Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-4 border-b">
          <h3 className="font-bold text-lg">Latest Pending Services</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-gray-500 text-sm italic">
                <th className="p-4">Service Name</th>
                <th className="p-4">Owner</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* هنا بتعملي Map على البيانات اللي جاية من الباك */}
              <tr className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs">📸</div>
                  Crystal Palace
                </td>
                <td className="p-4 text-gray-600 text-sm">Mahmoud Ali</td>
                <td className="p-4 text-gray-600 text-sm">2026-04-20</td>
                <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">Pending</span></td>
                <td className="p-4 flex justify-center gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">View</button>
                  <button className="p-1.5 text-green-600 hover:bg-green-50 rounded">Approve</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;