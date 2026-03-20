import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./styl/Sidebar.css";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(() => window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsOpen(mobile ? false : true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <button className="menu-btn" onClick={() => setIsOpen((prev) => !prev)} aria-label="Toggle sidebar">
          Menu
        </button>
      )}

      {isMobile && isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">UrbanGrind</h2>

        <ul className="sidebar-menu">
          <li>
            <Link to="/admin" onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin" onClick={() => setIsOpen(false)}>
              Members
            </Link>
          </li>
          <li>
            <Link to="/trainer" onClick={() => setIsOpen(false)}>
              Trainers
            </Link>
          </li>
          <li>
            <Link to="/trainer" onClick={() => setIsOpen(false)}>
              Membership
            </Link>
          </li>
          <li>
            <Link to="/trainer" onClick={() => setIsOpen(false)}>
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
    </>
  );
};

export default Sidebar;
