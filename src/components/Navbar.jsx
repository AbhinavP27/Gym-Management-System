import React from "react";
import "./style/Navbar.css";
import { useState } from "react";
// import logo from '../assets/logo-1.png'

const Navbar = () => {
  const [menuOpen,setMenuOpen] = useState(false)
  return (
    <div className="navbar shadow-lg">
      <a className="navbar-brand fw-bold text-white p-2" href="#hero">
        URBAN
        <span className="b-4 " style={{ color: "#c9f40a" }}>
          GRIND
        </span>
      </a>
      <div className="menu-toggle"
      onClick={()=>setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* <img className='urban' src={logo} alt="Logo" />   */}

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        {/* <li><a href="#">Home</a></li> */}
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#trainers">Trainers</a>
        </li>
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#plans">Plans</a>
        </li>
        <li>
          <a href="#testimonials">Testimonials</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <button className="join-btn">Login</button>
        </li>
        <li>
          <button className="join-btn">Join Now</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
