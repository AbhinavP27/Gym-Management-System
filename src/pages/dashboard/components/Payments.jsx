import DashboardLayout from "../layouts/DashboardLayout";
import ComingSoon from "./ComingSoon";

const Payments = () => {
  return (
    <DashboardLayout role="admin">
      <ComingSoon
        title="Payments"
        message="Payment and billing management will arrive soon."
      />
    </DashboardLayout>
  );
};

export default Payments;
