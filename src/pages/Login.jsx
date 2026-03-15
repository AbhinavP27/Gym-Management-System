import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example role detection (later from backend)
    if (email === "admin@urbangrind.com") {
      navigate("/admin-dashboard");
    } 
    else if (email === "trainer@urbangrind.com") {
      navigate("/trainer-dashboard");
    } 
    else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div className="login-container" id="login">
      <div className="login-card">
        <h2>Urban Grind Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;