import React, { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "../components/styl/Members.css";
import "../components/styl/Trainers.css";
import "../components/styl/DashboardOverview.css";
import {
  getTrainerStatusClass,
  TRAINER_STATUSES,
  useTrainerDirectory,
} from "../../../context/TrainerContext";

const Trainers = () => {
  const { trainers, addTrainer } = useTrainerDirectory();
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    members: "",
    status: TRAINER_STATUSES[0],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const specialization = form.specialization.trim();
    if (!name || !specialization) return;

    addTrainer({
      name,
      specialization,
      members: form.members,
      status: form.status,
    });

    setForm({
      name: "",
      specialization: "",
      members: "",
      status: TRAINER_STATUSES[0],
    });
  };

  const summary = useMemo(
    () => ({
      total: trainers.length,
      active: trainers.filter((trainer) => trainer.status === "Active").length,
      busy: trainers.filter((trainer) => trainer.status === "Busy").length,
      onLeave: trainers.filter((trainer) => trainer.status === "On Leave").length,
    }),
    [trainers]
  );

  return (
    <DashboardLayout role="admin">
      <div className="trainers-page">
        <div className="trainers-page__header">
          <div>
            <p className="eyebrow">Admin - Trainers</p>
            <h1>Trainers</h1>
            <p className="subtext">
              Trainer status, member load, and roster management are handled here.
            </p>
          </div>
        </div>

        <div className="dashboard-overview__stats">
          <div className="overview-stat">
            <span>Total Trainers</span>
            <strong>{summary.total}</strong>
          </div>
          <div className="overview-stat">
            <span>Active</span>
            <strong>{summary.active}</strong>
          </div>
          <div className="overview-stat">
            <span>Busy</span>
            <strong>{summary.busy}</strong>
          </div>
          <div className="overview-stat">
            <span>On Leave</span>
            <strong>{summary.onLeave}</strong>
          </div>
        </div>

        <form className="trainer-form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Trainer name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="specialization"
            type="text"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
          />
          <input
            name="members"
            type="number"
            min="0"
            placeholder="Members"
            value={form.members}
            onChange={handleChange}
          />
          <select name="status" value={form.status} onChange={handleChange}>
            {TRAINER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button type="submit">Add Trainer</button>
        </form>

        <div className="trainers-card">
          <div className="table-head">
            <span>Name</span>
            <span>Specialization</span>
            <span>Members</span>
            <span>Status</span>
          </div>
          <div className="table-body">
            {trainers.map((trainer) => (
              <div key={trainer.id} className="table-row">
                <span>{trainer.name}</span>
                <span>{trainer.specialization}</span>
                <span>{trainer.members}</span>
                <span className={`pill ${getTrainerStatusClass(trainer.status)}`}>
                  {trainer.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Trainers;
