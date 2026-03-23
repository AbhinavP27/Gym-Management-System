import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { trainers as trainerPool } from "../../../data/dashboard";
import "../components/styl/Members.css";

const PLANS = ["Basic", "Gold", "Diamond"];

const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];
const normalizeSearch = (value) => value.trim().toLowerCase().replace(/\s+/g, " ");

const futureDate = (daysAhead) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().slice(0, 10);
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
        const response = await fetch("https://jsonplaceholder.typicode.com/users?_limit=50", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const json = await response.json();
        const mapped = json.map((item) => ({
          id: item.id,
          name: item.name,
          plan: getRandomItem(PLANS),
          trainer: getRandomItem(trainerPool).name,
          expiry: futureDate(Math.floor(Math.random() * 150) + 15),
        }));

        setMembersData(mapped);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
    return () => controller.abort();
  }, []);

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

  return (
    <DashboardLayout role="admin">
      <div className="members-page">
        <div className="members-page__header">
          <div>
            <p className="eyebrow">Admin - Members</p>
            <h1>Members</h1>
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
