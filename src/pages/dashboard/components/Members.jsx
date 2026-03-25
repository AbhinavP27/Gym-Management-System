import React, { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { members as memberRoster } from "../../../data/dashboard";
import "../components/styl/Members.css";

const normalizeSearch = (value = "") =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const Members = ({ role = "admin", userId = null }) => {
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [trainerFilter, setTrainerFilter] = useState("");

  const membersData = useMemo(() => {
    if (role === "trainer") {
      return memberRoster.filter((member) => member.trainerId === userId);
    }

    return memberRoster;
  }, [role, userId]);

  const planOptions = useMemo(
    () =>
      [...new Set(membersData.map((member) => member.plan))]
        .filter(Boolean)
        .sort((first, second) => first.localeCompare(second)),
    [membersData]
  );

  const trainerOptions = useMemo(
    () =>
      [...new Set(membersData.map((member) => member.trainer))]
        .filter(Boolean)
        .sort((first, second) => first.localeCompare(second)),
    [membersData]
  );

  const filteredMembers = useMemo(() => {
    const term = normalizeSearch(query);
    return membersData.filter((member) => {
      const matchesSearch =
        !term ||
        normalizeSearch(member.name).includes(term) ||
        normalizeSearch(member.trainer).includes(term) ||
        normalizeSearch(member.plan).includes(term) ||
        normalizeSearch(member.expiry).includes(term);
      const matchesPlan = !planFilter || member.plan === planFilter;
      const matchesTrainer = !trainerFilter || member.trainer === trainerFilter;

      return matchesSearch && matchesPlan && matchesTrainer;
    });
  }, [query, planFilter, trainerFilter, membersData]);

  const isTrainerView = role === "trainer";
  const title = isTrainerView ? "My Members" : "Members";
  const eyebrow = isTrainerView ? "Trainer - My Members" : "Admin - Members";
  const subtext = isTrainerView
    ? `${membersData.length} assigned clients are listed here for the trainer workflow.`
    : "Shared member roster used across admin and trainer attendance.";
  const hasActiveFilters = Boolean(query || planFilter || trainerFilter);
  const emptyMessage = hasActiveFilters
    ? "No members match the current filters."
    : isTrainerView
    ? "No members are assigned to this trainer yet."
    : "No members available.";

  return (
    <DashboardLayout role={role}>
      <div className="members-page">
        <div className="members-page__header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="subtext">{subtext}</p>
          </div>
          <div className="members-controls">
            <input
              className="members-search"
              type="search"
              placeholder="Search by name, trainer, or plan..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            <select
              className="members-filter"
              value={planFilter}
              onChange={(event) => setPlanFilter(event.target.value)}
            >
              <option value="">All Plans</option>
              {planOptions.map((plan) => (
                <option key={plan} value={plan}>
                  {plan}
                </option>
              ))}
            </select>

            {!isTrainerView && (
              <select
                className="members-filter"
                value={trainerFilter}
                onChange={(event) => setTrainerFilter(event.target.value)}
              >
                <option value="">All Trainers</option>
                {trainerOptions.map((trainer) => (
                  <option key={trainer} value={trainer}>
                    {trainer}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="members-card">
          <div className={`table-head ${isTrainerView ? "table-head--trainer" : ""}`}>
            <span>Name</span>
            <span>Plan</span>
            {!isTrainerView && <span>Trainer</span>}
            <span>Expiry</span>
          </div>

          <div className="table-body">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className={`table-row ${isTrainerView ? "table-row--trainer" : ""}`}
              >
                <span>{member.name}</span>
                <span>{member.plan}</span>
                {!isTrainerView && <span>{member.trainer}</span>}
                <span>{member.expiry}</span>
              </div>
            ))}

            {filteredMembers.length === 0 && (
              <div className="empty-state">{emptyMessage}</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Members;
