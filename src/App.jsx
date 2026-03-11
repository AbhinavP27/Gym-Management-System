import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trainers from './components/Trainers'
import About from './components/About'
import Footer from './components/Footer'
import Plans from './components/Plans'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contacts from './components/Contacts'


const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Trainers />
      <Services />
      <Plans />
      <Testimonials />
      <Contacts />
      <Footer />
    </>
  )
}

export default App