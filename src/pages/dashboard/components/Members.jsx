import React, { useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { members as memberRoster } from "../../../data/dashboard";
import "../components/styl/Members.css";

const normalizeSearch = (value = "") =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const Members = ({ role = "admin", userId = null }) => {
  const [query, setQuery] = useState("");

  const membersData = useMemo(() => {
    if (role === "trainer") {
      return memberRoster.filter((member) => member.trainerId === userId);
    }

    return memberRoster;
  }, [role, userId]);

  const filteredMembers = useMemo(() => {
    const term = normalizeSearch(query);
    if (!term) return membersData;

    return membersData.filter(
      (member) =>
        normalizeSearch(member.name).includes(term) ||
        normalizeSearch(member.trainer).includes(term) ||
        normalizeSearch(member.plan).includes(term) ||
        normalizeSearch(member.expiry).includes(term)
    );
  }, [query, membersData]);

  const isTrainerView = role === "trainer";
  const title = isTrainerView ? "My Members" : "Members";
  const eyebrow = isTrainerView ? "Trainer - My Members" : "Admin - Members";
  const subtext = isTrainerView
    ? `${membersData.length} assigned clients are listed here for the trainer workflow.`
    : "Shared member roster used across admin and trainer attendance.";
  const emptyMessage = query
    ? "No members match your search."
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
          <input
            className="members-search"
            type="search"
            placeholder="Search by name, trainer, or plan..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="members-card">
          <div className="table-head">
            <span>Name</span>
            <span>Plan</span>
            <span>Trainer</span>
            <span>Expiry</span>
          </div>

          <div className="table-body">
            {filteredMembers.map((member) => (
              <div key={member.id} className="table-row">
                <span>{member.name}</span>
                <span>{member.plan}</span>
                <span>{member.trainer}</span>
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
