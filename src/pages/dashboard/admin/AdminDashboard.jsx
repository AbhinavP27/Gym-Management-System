import DashboardLayout from "../layouts/DashboardLayout";
import "../components/styl/DashboardOverview.css";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard-overview">
        <div className="dashboard-overview__hero">
          <div>
            <p className="eyebrow">Admin Dashboard</p>
            <h1>Control Center</h1>
            <p className="subtext">
              Use the admin menu to manage trainers, members, attendance, and reports.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
