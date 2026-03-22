import React, { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { trainers as trainerData } from "../../../data/dashboard";
import "../components/styl/Members.css";
import "../components/styl/Trainers.css";

const STATUSES = ["Active", "Busy", "On Leave"];

const Trainers = () => {
  const [query, setQuery] = useState("");

  const trainersWithStatus = useMemo(
    () =>
      trainerData.map((t) => ({
        ...t,
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      })),
    []
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return trainersWithStatus.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.specialization.toLowerCase().includes(q) ||
        t.status.toLowerCase().includes(q)
    );
  }, [query, trainersWithStatus]);

  return (
    <DashboardLayout role="admin">
      <div className="trainers-page">
        <div className="trainers-page__header">
          <div>
            <p className="eyebrow">Admin · Trainers</p>
            <h1>Trainers</h1>
            <p className="subtext">
              Overview of trainers, their specialization, load, and status.
            </p>
          </div>
          <input
            className="trainers-search"
            type="search"
            placeholder="Search by name, specialization, or status..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="trainers-card">
          <div className="table-head">
            <span>Name</span>
            <span>Specialization</span>
            <span>Members</span>
            <span>Status</span>
          </div>
          <div className="table-body">
            {filtered.map((t) => (
              <div key={t.id} className="table-row">
                <span>{t.name}</span>
                <span>{t.specialization}</span>
                <span>{t.members}</span>
                <span
                  className={`pill ${
                    t.status === "Active"
                      ? "pill--green"
                      : t.status === "Busy"
                      ? "pill--blue"
                      : "pill--amber"
                  }`}
                >
                  {t.status}
                </span>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="empty-state">No trainers match your search.</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Trainers;
