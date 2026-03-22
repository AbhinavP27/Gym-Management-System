import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
// import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Reg from './pages/Reg'
import AdminDashboard from './pages/dashboard/admin/AdminDashboard'
import Reports from './pages/dashboard/components/Reports'
import Payments from './pages/dashboard/components/Payments'
import Members from './pages/dashboard/components/Members'
import Trainers from './pages/dashboard/components/Trainers'
import Settings from './pages/dashboard/components/Settings'
import { Toaster } from 'react-hot-toast'
import UserDashboard from './pages/dashboard/user/UserDashboard'
import TrainerDashboard from './pages/dashboard/trainer/TrainerDashboard'
import ComingSoon from './pages/dashboard/components/ComingSoon'
import Messages from './pages/dashboard/components/Messages'


const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        containerStyle={{ zIndex: 120000 }}
        toastOptions={{
          style: {
            background: "#111827",
            color: "#fff",
          },
        }}
      />
      {/* <Navbar /> */}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<><Home /><Login /></>} />
        <Route path='/join' element={<><Home /><Reg /></>} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/members' element={<Members />} />
        <Route path='/admin/trainers' element={<Trainers />} />
        <Route path='/admin/reports' element={<Reports />} />
        <Route path='/admin/payments' element={<Payments />} />
        <Route path='/admin/settings' element={<Settings role="admin" />} />
        <Route path='/user' element={<UserDashboard />} />
        <Route path='/trainer' element={<TrainerDashboard />} />
        <Route path='/trainer/messages' element={<Messages />} />
        <Route path='/trainer/settings' element={<Settings role="trainer" />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App
