import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { trainers as trainerData } from "../../../data/dashboard";
import "../components/styl/Members.css";
import "../components/styl/Trainers.css";

const STATUSES = ["Active", "Busy", "On Leave"];

const Trainers = () => {
  const [trainers, setTrainers] = useState(() =>
    trainerData.map((trainer) => ({
      ...trainer,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    }))
  );
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    members: "",
    status: STATUSES[0],
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

    setTrainers((current) => [
      ...current,
      {
        id: current.length ? Math.max(...current.map((trainer) => trainer.id)) + 1 : 1,
        name,
        specialization,
        members: Number(form.members) || 0,
        status: form.status,
      },
    ]);

    setForm({
      name: "",
      specialization: "",
      members: "",
      status: STATUSES[0],
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="trainers-page">
        <div className="trainers-page__header">
          <div>
            <p className="eyebrow">Admin - Trainers</p>
            <h1>Trainers</h1>
            <p className="subtext">
              Overview of trainers, their specialization, member load, and status.
            </p>
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
            {STATUSES.map((status) => (
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
                <span
                  className={`pill ${
                    trainer.status === "Active"
                      ? "pill--green"
                      : trainer.status === "Busy"
                      ? "pill--blue"
                      : "pill--amber"
                  }`}
                >
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
