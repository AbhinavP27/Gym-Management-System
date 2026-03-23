import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { trainers as trainerPool } from "../../../data/dashboard";
import "../components/styl/Members.css";

const PLANS = ["Basic", "Gold", "Diamond"];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const futureDate = (daysAhead) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
};

const Members = () => {
  const [query, setQuery] = useState("");
  const [membersData, setMembersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=50", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const json = await res.json();

        const mapped = json.map((item) => ({
          id: item.id,
          name: item.name,
          plan: getRandomItem(PLANS),
          trainer: getRandomItem(trainerPool).name,
          expiry: futureDate(Math.floor(Math.random() * 150) + 15), // 15-165 days out
        }));

        setMembersData(mapped);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
    return () => controller.abort();
  }, []);

  const filteredMembers = useMemo(() => {
    const q = query.toLowerCase();
    return membersData.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.trainer.toLowerCase().includes(q) ||
        m.plan.toLowerCase().includes(q)
    );
  }, [query, membersData]);

  return (
    <DashboardLayout role="admin">
      <div className="members-page">
        <div className="members-page__header">
          <div>
            <p className="eyebrow">Admin · Members</p>
            <h1>Members</h1>
            {/* <p className="subtext">
              Showing 50 placeholder members with random trainers and expiry dates.
            </p> */}
          </div>
          <input
            className="members-search"
            type="search"
            placeholder="Search by name, trainer, or plan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="members-card">
          {loading && <div className="empty-state">Loading members...</div>}
          {error && <div className="empty-state">Error: {error}</div>}
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

            {!loading && !error && filteredMembers.length === 0 && (
              <div className="empty-state">No members match your search.</div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Members;
