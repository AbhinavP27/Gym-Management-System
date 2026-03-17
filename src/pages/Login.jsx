import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPrivacy, setShowPrivacy] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailPattern.test(email)) newErrors.email = "Enter a valid email";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

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
    <div className="login-overlay" id="login">
      <div className="login-card">
        <button
          type="button"
          className="close-button"
          aria-label="Close login"
          onClick={() => navigate("/")}
        />
        <h2>Urban Grind Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={`icon-toggle ${showPassword ? "active" : ""}`}
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword((v) => !v)}
            />
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <button type="submit" className="lg-btn">Login</button>

          <p className="policy-text">
            By logging in, you agree to our{" "}
            <a href="/privacy" onClick={(e) => {e.preventDefault(); setShowPrivacy(true);}}>
              Privacy Policy
            </a>.
          </p>

          <p className="policy-text">
            New here? <a href="/join" className="join-inline">Join now</a>
          </p>
        </form>

        {showPrivacy && (
          <div className="privacy-overlay">
            <div className="privacy-card">
              <button
                type="button"
                className="close-button"
                aria-label="Close privacy policy"
                onClick={() => setShowPrivacy(false)}
              />
              <h3>Privacy Policy</h3>
              <p>We collect only the data needed to create and manage your membership, schedule sessions, and process payments.</p>
              <ul>
                <li>Contact info (name, email, phone, address) for account and notifications.</li>
                <li>Fitness preferences and medical flags to tailor safe programming.</li>
                <li>Device and session data to keep your account secure.</li>
              </ul>
              <p>We never sell your data. You can request deletion or updates at any time by contacting support.</p>
              <button className="primary-cta" onClick={() => setShowPrivacy(false)}>Got it</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
