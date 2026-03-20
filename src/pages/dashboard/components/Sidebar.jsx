import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "220px", background: "#020617", padding: "20px" }}>
      <h2>Gym Panel</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/trainer">Trainer</Link></li>
        <li><Link to="/user">User</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;