import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
// import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Reg from './pages/Reg'
import AdminDashboard from './pages/dashboard/admin/AdminDashboard'
import { Toaster } from 'react-hot-toast'
import UserDashboard from './pages/dashboard/user/UserDashboard'
import TrainerDashboard from './pages/dashboard/trainer/TrainerDashboard'


const App = () => {
  return (
    <>
      <Toaster position="bottom-right"
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
          },
        }} />
      {/* <Navbar /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<><Home /><Login /></>} />
        <Route path='/join' element={<><Home /><Reg /></>} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/user' element={<UserDashboard />} />
        <Route path='/trainer' element={<TrainerDashboard />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
