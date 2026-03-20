import { Link } from "react-router-dom";
import React from "react";
import "./styl/Sidebar.css";

const Sidebar = ({ isMobile, isOpen, setIsOpen }) => {
  const handleClose = () => {
    if (isMobile) setIsOpen(false);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">UrbanGrind</h2>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admin" onClick={handleClose}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin" onClick={handleClose}>
            Members
          </Link>
        </li>
        <li>
          <Link to="/trainer" onClick={handleClose}>
            Trainers
          </Link>
        </li>
        <li>
          <Link to="/trainer" onClick={handleClose}>
            Membership
          </Link>
        </li>
        <li>
          <Link to="/trainer" onClick={handleClose}>
            Settings
          </Link>
        </li>
        <li>
          <Link to="/login" className="logout">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
