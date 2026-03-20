import Sidebar from "../components/Sidebar";


const DashboardLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f172a", color: "white" }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;