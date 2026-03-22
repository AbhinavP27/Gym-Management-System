import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = ({ children, role }) => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(mobile ? false : true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => (isMobile ? !prev : true));
  };

  const closeSidebar = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        role={role}   // 🔥 FIXED
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {isMobile && isSidebarOpen && (
        <div className="overlay" onClick={closeSidebar} />
      )}

      <div className="content-area">
        <Topbar onToggle={toggleSidebar} isMobile={isMobile} />
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;