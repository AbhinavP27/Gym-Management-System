import DashboardLayout from "../layouts/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import {
  getTrainerStatusClass,
  TRAINER_STATUSES,
  useTrainerDirectory,
} from "../../../context/TrainerContext";
import "../components/styl/DashboardOverview.css";
import "../components/styl/WorkoutPlans.css";

const TrainerDashboard = ({ userId = null }) => {
  const { trainerId: trainerIdParam } = useParams();
  const { trainers, updateTrainerStatus } = useTrainerDirectory();
  const trainerId = Number(trainerIdParam ?? userId);
  const trainer = trainers.find((item) => item.id === trainerId);

  if (!trainer) {
    return (
      <DashboardLayout role="trainer">
        <div className="dashboard-overview">
          <div className="dashboard-overview__hero">
            <div>
              <p className="eyebrow">Trainer Dashboard</p>
              <h1>Trainer Not Found</h1>
              <p className="subtext">
                No trainer profile is connected to this dashboard route.
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="trainer">
      <div className="dashboard-overview">
        <div className="dashboard-overview__hero">
          <div>
            <p className="eyebrow">Trainer Dashboard</p>
            <h1>{trainer.name}</h1>
            {/* <p className="subtext">
              Update your status manually. The admin dashboard uses the same value.
            </p> */}
          </div>
          <span className={`pill ${getTrainerStatusClass(trainer.status)}`}>
            {trainer.status}
          </span>
        </div>

        <div className="dashboard-overview__stats">
          <div className="overview-stat">
            <span>Specialization</span>
            <strong>{trainer.specialization}</strong>
          </div>
          <div className="overview-stat">
            <span>Assigned Members</span>
            <strong>{trainer.members}</strong>
          </div>
        </div>

        <div className="dashboard-panel">
          <p className="eyebrow">Status Control</p>
          <h2>Set Your Availability</h2>
          <p className="subtext">
            This does not change automatically. Your selection stays active until you update it.
          </p>

          <div className="status-editor">
            <label htmlFor="trainer-status">Current status</label>
            <select
              id="trainer-status"
              value={trainer.status}
              onChange={(event) => updateTrainerStatus(trainer.id, event.target.value)}
            >
              {TRAINER_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="dashboard-panel">
          <p className="eyebrow">Diet Plans</p>
          <h2>Assign Meal Plans</h2>
          <p className="subtext">
            Push breakfast, lunch, pre-workout, and dinner recommendations to your assigned
            members from the diet planner.
          </p>
          <Link to={`/trainer/${trainer.id}/diets`} className="workout-link">
            Open Diet Planner
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainerDashboard;
