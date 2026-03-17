import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Reg = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        weight: "",
        height: "",
        plan: "",
        trainer: "",
        dob: "",
        gender: "",
        pronouns: "",
        address: "",
        city: "",
        zip: "",
        startDate: "",
        workoutWindow: "",
        hasMedical: "no",
        medicalHeart: false,
        medicalDizzy: false,
        medicalInjury: false,
        physicianNote: "",
        goals: "",
        experience: "",
        consentLiability: false,
        consentPrivacy: false,
        consentMarketing: false,
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericPattern = /^[0-9]+(\.[0-9]+)?$/;
    const phonePattern = /^[0-9]{10,15}$/;
    const plans = ["Basic", "Gold", "Diamond"];
    const trainers = ["Smith Doe", "Emily Smith", "Michael John"];

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox" ? checked : type === "file" ? (files?.[0]?.name || "") : value,
            // Clear trainer when plan is downgraded to Basic
            ...(name === "plan" && value === "Basic" ? { trainer: "" } : {}),
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!form.fullName.trim()) newErrors.fullName = "Name is required";

        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!emailPattern.test(form.email)) newErrors.email = "Enter a valid email";

        if (!form.phone.trim()) newErrors.phone = "Phone is required";
        else if (!phonePattern.test(form.phone)) newErrors.phone = "Enter 10-15 digits only";

        if (!form.password.trim()) newErrors.password = "Password is required";
        else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Confirm your password";
        else if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Passwords do not match";

        if (!form.dob) newErrors.dob = "Date of birth is required";
        else {
            const age = Math.floor((Date.now() - new Date(form.dob)) / (365.25 * 24 * 60 * 60 * 1000));
            if (age < 16) newErrors.dob = "Members must be at least 16 years old";
        }

        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.city.trim()) newErrors.city = "City is required";
        if (!form.zip.trim()) newErrors.zip = "ZIP/Postal code is required";

        if (!form.startDate) newErrors.startDate = "Choose a start date";
        if (!form.workoutWindow) newErrors.workoutWindow = "Select a preferred workout window";

        if (!form.goals) newErrors.goals = "Select a primary goal";
        if (!form.experience) newErrors.experience = "Select experience level";

        if (!form.weight.trim()) newErrors.weight = "Weight is required";
        else if (!numericPattern.test(form.weight)) newErrors.weight = "Use numbers only";

        if (!form.height.trim()) newErrors.height = "Height is required";
        else if (!numericPattern.test(form.height)) newErrors.height = "Use numbers only";

        if (!form.plan) newErrors.plan = "Select a plan";

        const needsTrainer = form.plan === "Gold" || form.plan === "Diamond";
        if (needsTrainer && !form.trainer) newErrors.trainer = "Select a trainer for Gold/Diamond plans";

        if (!form.consentLiability) newErrors.consentLiability = "Liability waiver is required";
        if (!form.consentPrivacy) newErrors.consentPrivacy = "Privacy consent is required";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length) return;

        // TODO: replace with real registration API
        alert("Registration submitted! We will confirm shortly.");
        navigate("/");
    };

    const isTrainerDisabled = !(form.plan === "Gold" || form.plan === "Diamond");
    const validateStep = (step) => {
        const allErrors = validate();
        if (step === 1) {
            const allowed = [
                "fullName",
                "email",
                "phone",
                "password",
                "confirmPassword",
                "dob",
                "address",
                "city",
                "zip",
                "startDate",
                "workoutWindow",
            ];
            return Object.fromEntries(Object.entries(allErrors).filter(([key]) => allowed.includes(key)));
        }
        return allErrors;
    };

    const handleNext = () => {
        const stepErrors = validateStep(1);
        setErrors(stepErrors);
        if (Object.keys(stepErrors).length === 0) setCurrentStep(2);
    };

    const handleBack = () => setCurrentStep(1);

    return (
        <div className="login-overlay" id="join">
            <div className="login-card wide-card">
                <button
                    type="button"
                    className="close-button"
                    aria-label="Close registration"
                    onClick={() => navigate("/")}
                />
                <h2>Join Urban Grind</h2>
                <div className="progress-wrapper">
                    <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
                        <span>1</span>
                        <p>Personal Info</p>
                    </div>

                    <div className="progress-line"></div>

                    <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
                        <span>2</span>
                        <p>Fitness Details</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="split-form wide-form">
                    {/* STEP 1 */}
                    <div className={`step ${currentStep === 1 ? "active" : ""}`}>
                        <div className="form-col">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <p className="error-text">{errors.fullName}</p>}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <p className="error-text">{errors.phone}</p>}

                            <div className="password-row">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
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

                            <div className="password-row">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
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

                            <input
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                                value={form.dob}
                                onChange={handleChange}
                            />
                            {errors.dob && <p className="error-text">{errors.dob}</p>}

                            <select name="gender" value={form.gender} onChange={handleChange} className="select-visible">
                                <option value="">Gender (optional)</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>

                            <input
                                type="text"
                                name="pronouns"
                                placeholder="Pronouns (optional)"
                                value={form.pronouns}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-col">
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={form.address}
                                onChange={handleChange}
                            />
                            {errors.address && <p className="error-text">{errors.address}</p>}

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                            />
                            {errors.city && <p className="error-text">{errors.city}</p>}

                            <input
                                type="text"
                                name="zip"
                                placeholder="ZIP / Postal Code"
                                value={form.zip}
                                onChange={handleChange}
                            />
                            {errors.zip && <p className="error-text">{errors.zip}</p>}

                            <input
                                type="date"
                                name="startDate"
                                placeholder="Preferred Start Date"
                                value={form.startDate}
                                onChange={handleChange}
                            />
                            {errors.startDate && <p className="error-text">{errors.startDate}</p>}

                            <select
                                name="workoutWindow"
                                value={form.workoutWindow}
                                onChange={handleChange}
                                className="select-visible"
                            >
                                <option value="">Preferred Workout Time</option>
                                <option value="Morning (5-9 AM)">Morning (5-9 AM)</option>
                                <option value="Midday (11-2 PM)">Midday (11-2 PM)</option>
                                <option value="Evening (4-8 PM)">Evening (4-8 PM)</option>
                                <option value="Late (8-11 PM)">Late (8-11 PM)</option>
                            </select>
                            {errors.workoutWindow && <p className="error-text">{errors.workoutWindow}</p>}
                        </div>
                    </div>

                    {/* STEP 2 */}
                    <div className={`step ${currentStep === 2 ? "active" : ""}`}>
                        <div className="form-col">
                            <input
                                type="text"
                                name="weight"
                                placeholder="Weight (kg)"
                                value={form.weight}
                                onChange={handleChange}
                            />
                            {errors.weight && <p className="error-text">{errors.weight}</p>}

                            <input
                                type="text"
                                name="height"
                                placeholder="Height (cm)"
                                value={form.height}
                                onChange={handleChange}
                            />
                            {errors.height && <p className="error-text">{errors.height}</p>}

                            <select name="plan" value={form.plan} onChange={handleChange} className="select-visible">
                                <option value="">Select Plan</option>
                                {plans.map((plan) => (
                                    <option key={plan} value={plan}>
                                        {plan}
                                    </option>
                                ))}
                            </select>
                            {errors.plan && <p className="error-text">{errors.plan}</p>}

                            <select
                                name="trainer"
                                value={form.trainer}
                                onChange={handleChange}
                                disabled={isTrainerDisabled}
                                className="select-visible"
                            >
                                <option value="">{isTrainerDisabled ? "Trainer (Gold/Diamond only)" : "Select Trainer"}</option>
                                {trainers.map((trainer) => (
                                    <option key={trainer} value={trainer}>
                                        {trainer}
                                    </option>
                                ))}
                            </select>
                            {errors.trainer && <p className="error-text">{errors.trainer}</p>}

                            <select
                                name="goals"
                                value={form.goals}
                                onChange={handleChange}
                                className="select-visible"
                            >
                                <option value="">Primary Goal</option>
                                <option value="Weight Loss">Weight Loss</option>
                                <option value="Strength">Strength</option>
                                <option value="Rehabilitation">Rehabilitation</option>
                                <option value="Endurance">Endurance</option>
                                <option value="Bodybuilding">Bodybuilding</option>
                            </select>
                            {errors.goals && <p className="error-text">{errors.goals}</p>}

                            <select
                                name="experience"
                                value={form.experience}
                                onChange={handleChange}
                                className="select-visible"
                            >
                                <option value="">Experience Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            {errors.experience && <p className="error-text">{errors.experience}</p>}

                            <div className="medical-section">

                                <p className="medical-title">
                                    Do you have any medical conditions we should know about?
                                </p>

                                <div className="medical-yesno">
                                    <label>
                                        <input
                                            type="radio"
                                            name="hasMedical"
                                            value="yes"
                                            checked={form.hasMedical === "yes"}
                                            onChange={handleChange}
                                        />
                                        <span></span>
                                        Yes
                                    </label>

                                    <label>
                                        <input
                                            type="radio"
                                            name="hasMedical"
                                            value="no"
                                            checked={form.hasMedical === "no"}
                                            onChange={handleChange}
                                        />
                                        <span></span>
                                        No
                                    </label>
                                </div>

                                {form.hasMedical === "yes" && (
                                    <div className="checkbox-group">

                                        <label className="premium-check">
                                            <input
                                                type="checkbox"
                                        name="medicalHeart"
                                        checked={form.medicalHeart}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark" aria-hidden="true"></span>
                                    History of heart issues
                                </label>

                                <label className="premium-check">
                                    <input
                                                type="checkbox"
                                        name="medicalDizzy"
                                        checked={form.medicalDizzy}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark" aria-hidden="true"></span>
                                    Frequent dizziness or fainting
                                </label>

                                <label className="premium-check">
                                    <input
                                                type="checkbox"
                                        name="medicalInjury"
                                        checked={form.medicalInjury}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark" aria-hidden="true"></span>
                                    Current injury under treatment
                                </label>

                            </div>
                        )}

                            </div>

                            <div className="file-row">
                                <label className="file-label">
                                    Physician clearance (optional)
                                    <input type="file" name="physicianNote" onChange={handleChange} />
                                </label>
                                {form.physicianNote && <span className="file-name">{form.physicianNote}</span>}
                            </div>
                        </div>

                        <div className="form-col">
                            <div className="consent-row">
                                <label className="premium-check">
                                    <input
                                        type="checkbox"
                                        name="consentLiability"
                                        checked={form.consentLiability}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark" aria-hidden="true"></span>
                                    I accept the liability waiver
                                </label>
                                {errors.consentLiability && <p className="error-text">{errors.consentLiability}</p>}

                                <label className="premium-check">
                                    <input
                                        type="checkbox"
                                        name="consentPrivacy"
                                        checked={form.consentPrivacy}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark" aria-hidden="true"></span>
                                    I agree to the privacy policy
                                </label>
                                {errors.consentPrivacy && <p className="error-text">{errors.consentPrivacy}</p>}

                                <label className="premium-check">
                                    <input
                                        type="checkbox"
                                        name="consentMarketing"
                                        checked={form.consentMarketing}
                                        onChange={handleChange}
                                    />
                                    <span className="checkmark" aria-hidden="true"></span>
                                    Send me updates and offers (optional)
                                </label>

                                <p className="policy-text">
                                    By continuing, you agree to our{" "}
                                    <a href="/privacy" onClick={(e) => {e.preventDefault(); setShowPrivacy(true);}}>Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="nav-buttons">
                        {currentStep === 2 && (
                            <button type="button" className="secondary" onClick={handleBack}>
                                Back
                            </button>
                        )}
                        {currentStep === 1 && (
                            <button type="button" onClick={handleNext}>
                                Next
                            </button>
                        )}
                        {currentStep === 2 && <button type="submit">Complete Registration</button>}
                    </div>

                    <p className="policy-text center-link">
                        Already a member? <a href="/login" className="join-inline">Login</a>
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
                            <p>We collect only what we need to run your membership, schedule training, and keep you safe.</p>
                            <ul>
                                <li>Profile details (contact, address) for communication and billing.</li>
                                <li>Fitness goals and medical flags to customize programming responsibly.</li>
                                <li>Session/device logs to secure your account and improve services.</li>
                            </ul>
                            <p>We never sell your data. You can access or delete your data by reaching out to support anytime.</p>
                            <button className="primary-cta" onClick={() => setShowPrivacy(false)}>Got it</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reg;
