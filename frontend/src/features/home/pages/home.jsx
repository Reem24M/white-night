import React from 'react'
// import Navbar from '@/shared/components/navbar';
// import Footer from '../../../shared/components/footer';
import VenueCard from '../../../shared/components/venueCard';
import HeroSection from '../components/hero';
import PremiumServices from '../components/PremiumServices';
import FeaturedVenues from '../components/featured_venus';
export default function Home() {
  console.log("Home component rendered");
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection/>
      <FeaturedVenues/>
      {/* <VenueCard/> */}
      <PremiumServices/>
      {/* <Footer /> */}
    </div>
  )
}
