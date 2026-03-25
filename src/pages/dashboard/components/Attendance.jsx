import { useMemo, useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { members as memberRoster, trainers as trainerRoster } from "../../../data/dashboard";
import "../components/styl/Attendance.css";
import DashboardLayout from "../layouts/DashboardLayout";

const COLORS = ["#22c55e", "#f59e0b"];
const ROLE_LABELS = {
  trainer: "Trainer",
  member: "Client",
};

const getToday = () => new Date().toISOString().split("T")[0];
const normalizeSearch = (value = "") =>
  value.trim().toLowerCase().replace(/\s+/g, " ");

const buildAttendanceRoster = () => {
  const today = getToday();

  return [
    ...trainerRoster.map((trainer, index) => ({
      id: `trainer-${trainer.id}`,
      userId: trainer.id,
      name: trainer.name,
      role: "trainer",
      trainerId: null,
      date: today,
      status: index % 2 === 0 ? "Present" : "Absent",
    })),
    ...memberRoster.map((member, index) => ({
      id: `member-${member.id}`,
      userId: member.id,
      name: member.name,
      role: "member",
      trainerId: member.trainerId,
      date: today,
      status: index % 4 === 0 ? "Absent" : "Present",
    })),
  ];
};

const Attendance = ({ role, userId }) => {
  const [attendance, setAttendance] = useState(() => buildAttendanceRoster());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    let data = attendance;

    if (role === "admin") {
      data = data.filter((entry) => entry.role === "trainer");
    }

    if (role === "trainer") {
      data = data.filter(
        (entry) => entry.role === "member" && entry.trainerId === userId
      );
    }

    if (role === "user") {
      data = data.filter(
        (entry) => entry.role === "member" && entry.userId === userId
      );
    }

    if (filter === "today") {
      const today = getToday();
      data = data.filter((entry) => entry.date === today);
    }

    if (filter === "present") {
      data = data.filter((entry) => entry.status === "Present");
    }

    if (filter === "absent") {
      data = data.filter((entry) => entry.status === "Absent");
    }

    const term = normalizeSearch(query);
    if (term) {
      data = data.filter((entry) => {
        const roleLabel = ROLE_LABELS[entry.role] || entry.role;

        return (
          normalizeSearch(entry.name).includes(term) ||
          normalizeSearch(roleLabel).includes(term) ||
          normalizeSearch(entry.date).includes(term) ||
          normalizeSearch(entry.status).includes(term)
        );
      });
    }

    return data;
  }, [attendance, filter, query, role, userId]);

  const stats = useMemo(() => {
    const present = filtered.filter((entry) => entry.status === "Present").length;
    const absent = filtered.length - present;

    return [
      { name: "Present", value: present },
      { name: "Absent", value: absent },
    ];
  }, [filtered]);

  const toggleAttendanceStatus = (id) => {
    setAttendance((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Present" ? "Absent" : "Present",
            }
          : item
      )
    );
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Role", "Date", "Status"],
      ...filtered.map((entry) => [
        entry.name,
        ROLE_LABELS[entry.role] || entry.role,
        entry.date,
        entry.status,
      ]),
    ];

    const csvContent = rows.map((row) => row.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute(
      "href",
      `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`
    );
    link.setAttribute("download", "attendance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout role={role}>
      <div className="attendance-page">
        <div className="attendance-header">
          <div>
            <h1>Attendance</h1>
            <p className="attendance-sub">Monitor attendance analytics</p>
          </div>

          <div className="actions">
            <input
              type="search"
              placeholder="Search by name, role, date, or status..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>

            <button onClick={exportCSV}>Export CSV</button>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <h3>Total</h3>
            <p>{filtered.length}</p>
          </div>
          <div className="stat-card">
            <h3>Present</h3>
            <p>{stats[0].value}</p>
          </div>
          <div className="stat-card">
            <h3>Absent</h3>
            <p>{stats[1].value}</p>
          </div>
        </div>

        <div className="chart-card">
          <PieChart width={300} height={300}>
            <Pie data={stats} dataKey="value" outerRadius={100}>
              {stats.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="attendance-card">
          <div className="attendance-head">
            <span>Name</span>
            <span>Role</span>
            <span>Date</span>
            <span>Status</span>
            {role !== "user" && <span>Action</span>}
          </div>

          {filtered.map((item) => (
            <div key={item.id} className="attendance-row">
              <span>{item.name}</span>
              <span>{ROLE_LABELS[item.role] || item.role}</span>
              <span>{item.date}</span>

              <span
                className={`status ${
                  item.status === "Present"
                    ? "status--present"
                    : "status--absent"
                }`}
              >
                {item.status}
              </span>

              {role !== "user" && (
                <button
                  className={`mark-btn ${
                    item.status === "Present" ? "mark-btn--absent" : ""
                  }`}
                  onClick={() => toggleAttendanceStatus(item.id)}
                >
                  {item.status === "Present" ? "Mark Absent" : "Mark Present"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
