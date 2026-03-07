import React from "react";
import "./style/Trainers.css";

import trainer1 from "../assets/trainer1.png";
import trainer2 from "../assets/trainer2.png";
import trainer3 from "../assets/trainer3.png";

const trainers = [
  { img: trainer1, name: "Smith Doe", role: "Strength Trainer" },
  { img: trainer2, name: "Emily Smith", role: "Cardio Trainer" },
  { img: trainer3, name: "Michael John", role: "Bodybuilding Trainer" },
];

const Trainers = () => {
  return (
    <section className="trainers">

      <h1 className="trainer-title">Meet Our Trainers</h1>

      <div className="trainer-container">
        {trainers.map((trainer, index) => (
          <div className="trainer-card" key={index}>
            <img src={trainer.img} alt={trainer.name} />
            <h2>{trainer.name}</h2>
            <p>{trainer.role}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Trainers;