import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trainers from './components/Trainers'
import About from './components/About'
import Footer from './components/Footer'


const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Trainers />
      <Footer />
    </>
  )
}

export default App