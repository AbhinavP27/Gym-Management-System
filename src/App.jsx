import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Reg from './pages/Reg'
import AdminDashboard from './pages/AdminDashboard'


const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<><Home /><Login /></>} />
        <Route path='/join' element={<><Home /><Reg /></>} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
