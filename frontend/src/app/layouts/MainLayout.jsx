import React from 'react'
import Navbar from '../../shared/components/navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../shared/components/footer'
export default function MainLayout() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
