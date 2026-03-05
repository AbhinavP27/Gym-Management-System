import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trainers from './components/Trainers'
import About from './components/About'
import Footer from './components/Footer'
import Plans from './components/Plans'


const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Trainers />
      <Plans />
      <Footer />
    </>
  )
}

export default App