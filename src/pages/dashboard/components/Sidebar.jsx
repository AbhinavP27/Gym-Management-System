import { Link } from "react-router-dom";
import React from "react";
import "./styl/Sidebar.css";
import { sidebarConfig } from "../../../data/sidebarConfig";

const Sidebar = ({ role , isMobile, isOpen, setIsOpen }) => {
  const handleClose = () => {
    if (isMobile) setIsOpen(false);
  };

  const menuItems = sidebarConfig[role] || [];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">UrbanGrind</h2>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <li key={index}>
              <Link to={item.path} onClick={handleClose}>
                {Icon && <Icon size={18} strokeWidth={1.75} />}
                {item.name}
              </Link>
            </li>
          );
        })}

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
