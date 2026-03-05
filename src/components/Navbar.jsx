import React from 'react'
import './style/Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar shadow-lg'>
      <a className="navbar-brand fw-bold text-danger p-2" href="#">
            Urban<span className="b-4 " style={{ color: '#0af4e5' }}>Grind</span>
          </a>

      <ul className='nav-links m-1'>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Trainers</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Plans</a></li>
        <li><a href="#">Testimonials</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Login</a></li>
        <li><button className="join-btn">Join Now</button></li>
      </ul>
    </div>
  )
}

export default Navbar