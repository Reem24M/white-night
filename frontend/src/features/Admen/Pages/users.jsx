import React from 'react';

const UserManagement = () => {
  // البيانات هنا هتيجي من الباك (Users API)
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex gap-2">
           <input type="text" placeholder="Search users..." className="border rounded-lg px-4 py-2 text-sm" />
           <button className="bg-black text-white px-4 py-2 rounded-lg text-sm italic font-bold">Filter</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                Omnya
              </td>
              <td className="p-4">omnya@example.com</td>
              <td className="p-4">Admin</td>
              <td className="p-4"><span className="text-green-600">Active</span></td>
              <td className="p-4 text-center">
                 <button className="text-red-500 hover:underline italic font-bold">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;