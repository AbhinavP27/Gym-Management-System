import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useMembershipPlans } from "../../../context/MembershipContext";
import { useMembers } from "../../../context/MemberContext";
import "../components/styl/UserPlan.css";
import "../components/styl/DashboardOverview.css";

const UserPlan = ({ userId: userIdProp = null }) => {
  const { userId: userIdParam } = useParams();
  const { plans } = useMembershipPlans();
  const { members, updateMemberPlan } = useMembers();
  const userId = Number(userIdParam ?? userIdProp);
  const member = members.find((item) => item.id === userId);

  const handlePlanUpdate = (planName) => {
    if (!member || member.plan === planName) {
      return;
    }

    updateMemberPlan(member.id, planName);
    toast.success(`Membership updated to ${planName}.`);
  };

  const currentPlan = plans.find((plan) => plan.name === member?.plan);

  return (
    <DashboardLayout role="user">
      <div className="user-plan-page">
        <div className="dashboard-overview__hero">
          <div>
            <p className="eyebrow">User - My Plan</p>
            <h1>Current Membership Plan</h1>
            <p className="subtext">
              Review your current plan and switch to another membership when you want to update it.
            </p>
          </div>
        </div>

        <div className="dashboard-overview__stats">
          <div className="overview-stat">
            <span>Current Plan</span>
            <strong>{member?.plan ?? "N/A"}</strong>
          </div>
          <div className="overview-stat">
            <span>Expiry</span>
            <strong>{member?.expiry ?? "N/A"}</strong>
          </div>
          <div className="overview-stat">
            <span>Trainer</span>
            <strong>{member?.trainer ?? "Not assigned"}</strong>
          </div>
        </div>

        {currentPlan && (
          <section className="dashboard-panel user-plan-current">
            <p className="eyebrow">My Current Plan</p>
            <h2>{currentPlan.name}</h2>
            <p className="user-plan-price">{currentPlan.price}</p>
            <ul className="user-plan-feature-list">
              {currentPlan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="user-plan-grid">
          {plans.map((plan) => {
            const isCurrent = member?.plan === plan.name;

            return (
              <article
                key={plan.id}
                className={`user-plan-card ${isCurrent ? "user-plan-card--active" : ""}`}
              >
                <div className="user-plan-card__head">
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.price}</p>
                  </div>
                  {plan.popular && <span className="pill pill--amber">Popular</span>}
                </div>

                <div className="user-plan-badges">
                  {plan.trainerRequired && <span className="user-plan-badge">Trainer Included</span>}
                  {isCurrent && <span className="user-plan-badge user-plan-badge--active">Current Plan</span>}
                </div>

                <ul className="user-plan-feature-list">
                  {plan.features.map((feature) => (
                    <li key={`${plan.id}-${feature}`}>{feature}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="user-plan-action"
                  disabled={isCurrent}
                  onClick={() => handlePlanUpdate(plan.name)}
                >
                  {isCurrent ? "Current Plan" : "Update Plan"}
                </button>
              </article>
            );
          })}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default UserPlan;
