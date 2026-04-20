import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('All');

  // مثال للأقسام اللي في الصورة
  const categories = ['All Saved', 'Halls', 'Photoshoot', 'Organization', 'Roof'];

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Services</h1>
        <p className="text-gray-500">Overview and management of all registered service categories</p>
      </div>

      {/* Search and Add Service */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <input 
            type="text" 
            placeholder="Search for services..." 
            className="w-full pl-10 pr-4 py-2 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-red-100"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition">
          <span>+</span> Add New Service
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition ${
              filter === cat ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Table */}
      <div className="border rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Reviews</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {/* هنا الـ Loop على البيانات */}
            <tr className="border-t hover:bg-gray-50">
              <td className="p-4">
                <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden">
                   <img src="https://via.placeholder.com/150" alt="service" className="object-cover w-full h-full" />
                </div>
              </td>
              <td className="p-4">
                <p className="font-bold text-gray-800">The Pasta House</p>
                <p className="text-xs text-gray-400">Wedding Hall</p>
              </td>
              <td className="p-4 text-gray-700 font-medium">⭐ 4.8</td>
              <td className="p-4 text-gray-500">234 reviews</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100">✏️</button>
                  <button className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100">🗑️</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;