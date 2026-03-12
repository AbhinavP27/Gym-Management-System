import React from "react";
import "./style/Trainers.css";

import trainer1 from "../assets/trainer1.png";
import trainer2 from "../assets/trainer2.png";
import trainer3 from "../assets/trainer3.png";

const trainers = [
{
    img: trainer1,
    name: "Smith Doe",
    role: "Strength Trainer",
    certificates: "ACE Certified Trainer",
    experience: "8+ Years Experience",
    details: "Specialist in strength training, muscle gain programs and athletic performance."
  },
  {
    img: trainer2,
    name: "Emily Smith",
    role: "Cardio Trainer",
    certificates: "ISSA Cardio Specialist",
    experience: "6+ Years Experience",
    details: "Expert in fat loss, endurance training and cardiovascular fitness programs."
  },
  {
    img: trainer3,
    name: "Michael John",
    role: "Bodybuilding Trainer",
    certificates: "IFBB Certified Coach",
    experience: "10+ Years Experience",
    details: "Professional bodybuilding coach with expertise in competition preparation."
  }
];

const Trainers = () => {
  return (
    <section className="trainers" id="trainers">
      <h1 className="trainer-title">Meet Our Trainers</h1>

      <div className="trainer-container">
        {trainers.map((trainer, index) => (
          <div className="trainer-card" key={index}>

            <img src={trainer.img} alt={trainer.name} />

            <h2>{trainer.name}</h2>
            <p>{trainer.role}</p>

            

            <div className="trainer-overlay">

              <h3>{trainer.name}</h3>

              <p><strong>{trainer.role}</strong></p>

              <p><b>Certificate:</b> {trainer.certificates}</p>

              <p><b>Experience:</b> {trainer.experience}</p>

              <p>{trainer.details}</p>

            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Trainers;
