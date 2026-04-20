import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './app/routes/AppRoutes'
import { Toaster } from 'sonner';
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster richColors position="top-center" />

        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}
