import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
// import Navbar from './components/Navbar'
import Login from './pages/Login'
import Reg from './pages/Reg'
import AdminDashboard from './pages/dashboard/admin/AdminDashboard'
import Reports from './pages/dashboard/components/Reports'
import Payments from './pages/dashboard/components/Payments'
import Members from './pages/dashboard/components/Members'
import Trainers from './pages/dashboard/components/Trainer'
import Settings from './pages/dashboard/components/Settings'
import { Toaster } from 'react-hot-toast'
import UserDashboard from './pages/dashboard/user/UserDashboard'
import TrainerDashboard from './pages/dashboard/trainer/TrainerDashboard'
import Messages from './pages/dashboard/components/Messages'
import Attendance from './pages/dashboard/components/Attendance'
import { TrainerProvider } from './context/TrainerContext'
import { MembershipProvider } from './context/MembershipContext'
import MembershipPlans from './pages/dashboard/components/MembershipPlans'


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

      <MembershipProvider>
        <TrainerProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<><Home /><Login /></>} />
            <Route path='/join' element={<><Home /><Reg /></>} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/admin/members' element={<Members role="admin" />} />
            <Route path='/admin/trainers' element={<Trainers />} />
            <Route path='/admin/membership' element={<MembershipPlans />} />
            <Route path='/admin/reports' element={<Reports />} />
            <Route path='/admin/payments' element={<Payments />} />
            <Route path='/admin/settings' element={<Settings role="admin" />} />
            <Route path='/admin/attendance' element={<Attendance role="admin" />} />
            <Route path='/user' element={<UserDashboard />} />
            <Route path='/user/attendance' element={<Attendance role="user" userId={10}/>} />

            
            <Route path='/trainer' element={<TrainerDashboard userId={1} />} />
            <Route path='/trainer/members' element={<Members role="trainer" userId={1} />} />
            <Route path='/trainer/messages' element={<Messages role="trainer" />} />
            <Route path='/trainer/settings' element={<Settings role="trainer" />} />
            <Route path='/trainer/attendance' element={<Attendance role="trainer" userId={1}/>} />
          </Routes>
        </TrainerProvider>
      </MembershipProvider>
      {/* <Footer /> */}
    </>
  )
}

export default App
