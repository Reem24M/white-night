import React, { useEffect, useState } from 'react';
import VenueCard from '../../../shared/components/venueCard';

const FeaturedVenues = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await fetch('http://localhost:7000/halls');
                const data = await response.json();

                setVenues(data.halls);
                console.log('Fetched venues:', data.halls);
            } catch (error) {
                console.error('Error fetching venues:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    return (
        <section className="py-20 px-5 ">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-light text-gray-800 mb-4">
                        Featured <span className="text-[#D4AF37] font-medium">Venues</span>
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Handpicked extraordinary spaces for your special celebration
                    </p>
                </div>

                {/* Loading */}
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-items-center">

                        {venues.map((venue) => (
                            <VenueCard
                                key={venue._id}
                                id={venue._id}
                                name={venue.name}
                                image={venue.coverPhoto?.url}
                                location={`${venue.address.city}, ${venue.address.governorate}`}
                                price={venue.priceRange}
                                rating={venue.averageRating}
                                capacity={venue.capacity}
                            />
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
};

export default FeaturedVenues;