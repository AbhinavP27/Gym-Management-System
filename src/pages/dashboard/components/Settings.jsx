import DashboardLayout from "../layouts/DashboardLayout";
import ComingSoon from "./ComingSoon";

const Reports = ({ role }) => {
  return (
    <DashboardLayout role={role}>
      <ComingSoon
        title="Settings"
        message="Customization and configuration options are coming soon."
      />
    </DashboardLayout>
  );
};

export default Reports;
