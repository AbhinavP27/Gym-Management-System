import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./styles/Login.css";

const plans = ["Basic", "Gold", "Diamond"];
const trainers = ["Smith Doe", "Emily Smith", "Michael John"];

const Reg = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
        plan: "",
        trainer: "",
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const incomingPlan = location.state?.plan;
        if (!incomingPlan) return;

        setForm((prev) => {
            const next = { ...prev, plan: incomingPlan };
            if (incomingPlan === "Basic") {
                next.trainer = "";
            }
            return next;
        });

        setErrors((prev) => {
            const { plan, trainer, ...rest } = prev;
            return rest;
        });
    }, [location.state?.plan]);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]{10}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const next = { ...prev, [name]: value };
            if (name === "plan" && value === "Basic") {
                next.trainer = "";
            }
            return next;
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.fullName.trim()) newErrors.fullName = "Name is required";

        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!emailPattern.test(form.email)) newErrors.email = "Enter a valid email";

        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        else if (!phonePattern.test(form.phone)) newErrors.phone = "Enter exactly 10 digits";

        if (!form.password.trim()) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Confirm your password";
        else if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Passwords do not match";

        if (!form.gender) newErrors.gender = "Select a gender option";

        if (!form.plan) newErrors.plan = "Choose a membership";

        const needsTrainer = form.plan === "Gold" || form.plan === "Diamond";
        if (needsTrainer && !form.trainer) newErrors.trainer = "Pick a trainer for Gold/Diamond plans";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length) return;

        // alert("Registration submitted! Welcome aboard.");
        navigate("/login");
        toast.success("Registration successful!");
    };

    const needsTrainer = form.plan === "Gold" || form.plan === "Diamond";

    return (
        <div className="login-overlay register-overlay" id="join">
            <div className="login-card register-card">
                <button
                    type="button"
                    className="close-button"
                    aria-label="Close registration"
                    onClick={() => navigate("/")}
                />

                <p className="eyebrow">Membership</p>
                <h2>Join Urban Grind</h2>
                <p className="subtext">Lean into the night - fill in the essentials and pick your perfect fit.</p>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-grid">
                        <label className="field">
                            <span>Name</span>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                        </label>

                        <label className="field">
                            <span>Email</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </label>

                        <label className="field">
                            <span>Phone</span>
                            <input
                                type="text"
                                name="phone"
                                placeholder="10 digits"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}
                        </label>

                        <label className="field">
                            <span>Password</span>
                            <div className="password-row">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className={`icon-toggle inside ${showPassword ? "active" : ""}`}
                                    aria-label="Toggle password visibility"
                                    onClick={() => setShowPassword((v) => !v)}
                                />
                            </div>
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </label>

                        <label className="field">
                            <span>Confirm Password</span>
                            <div className="password-row">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Re-enter password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className={`icon-toggle inside ${showPassword ? "active" : ""}`}
                                    aria-label="Toggle password visibility"
                                    onClick={() => setShowPassword((v) => !v)}
                                />
                            </div>
                            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                        </label>

                        <label className="field">
                            <span>Gender</span>
                            <select name="gender" value={form.gender} onChange={handleChange} className="select-visible">
                                <option value="">Choose an option</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                            {errors.gender && <p className="error-text">{errors.gender}</p>}
                        </label>

                        <label className="field">
                            <span>Membership</span>
                            <select name="plan" value={form.plan} onChange={handleChange} className="select-visible">
                                <option value="">Select membership</option>
                                {plans.map((plan) => (
                                    <option key={plan} value={plan}>
                                        {plan}
                                    </option>
                                ))}
                            </select>
                            {errors.plan && <p className="error-text">{errors.plan}</p>}
                        </label>

                        <label className={`field ${needsTrainer ? "" : "disabled-field"}`}>
                            <span>Trainer</span>
                            <select
                                name="trainer"
                                value={form.trainer}
                                onChange={handleChange}
                                disabled={!needsTrainer}
                                className="select-visible"
                            >
                                <option value="">{needsTrainer ? "Select trainer" : "Gold & Diamond only"}</option>
                                {trainers.map((trainer) => (
                                    <option key={trainer} value={trainer}>
                                        {trainer}
                                    </option>
                                ))}
                            </select>
                            {errors.trainer && <p className="error-text">{errors.trainer}</p>}
                        </label>
                    </div>

                    <div className="action-row">
                        <button type="submit">Create Account</button>
                        <p className="link-cta mt-3">Already a gym buddy?</p>
                        <Link to="/login" className="link-ctan">
                            Login now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reg;
