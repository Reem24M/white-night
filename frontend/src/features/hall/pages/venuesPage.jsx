// src/features/hall/pages/VenuesPage.jsx
import VenueFilter from '../components/VenueFilter';
import VenueCard from '../../../shared/components/venueCard';
import { useState } from 'react';
export default function VenuesPage() {
  const [, setActiveFilters] = useState({ price: 'all', capacity: 1000 });

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({ ...prev, [filterType]: value }));
   
  };

  return (
    <div className="flex gap-8 p-10">
      <aside className="w-1/4">
        <VenueFilter onFilterChange={handleFilterChange} />
      </aside>
      
      <main className="w-3/4 grid grid-cols-2 gap-4">
        
        <VenueCard />
      </main>
    </div>
  );
}