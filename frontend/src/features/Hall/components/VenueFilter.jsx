// src/features/hall/components/VenueFilter.jsx
export default function VenueFilter({ onFilterChange }) {
  return (
    <div className="space-y-6">
      {/* فلتر السعر */}
      <div>
        <h4 className="font-bold mb-2">Price Range</h4>
        <select onChange={(e) => onFilterChange('price', e.target.value)} className="w-full p-2 border rounded">
          <option value="all">All Prices</option>
          <option value="low">Economic</option>
          <option value="high">Luxury</option>
        </select>
      </div>
      
      {/* فلتر السعة */}
      <div>
        <h4 className="font-bold mb-2">Capacity</h4>
        <input 
          type="range" 
          min="50" max="1000" 
          onChange={(e) => onFilterChange('capacity', e.target.value)}
          className="w-full accent-[#8C5E35]"
        />
      </div>
    </div>
  );
}