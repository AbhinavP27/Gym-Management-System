import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style/Plans.css'

const plans = [
  {
    name: "Basic",
    price: "₹999 / month",
    features: [
      "Access to Gym Equipment",
      "Basic Workout Plan",
      "Locker Facility",
      "Fitness Assessment"
    ]
  },
  {
    name: "Gold",
    price: "₹3499 / month",
    features: [
      "All Premium Features",
      "Personal Trainer (8 sessions)",
      "Diet Consultation",
      "Monthly Progress Tracking"
    ],
    popular: true
  },
  {
    name: "Diamond",
    price: "₹5499 / month",
    features: [
      "All Gold Features",
      "Unlimited Personal Training",
      "Body Transformation Program",
      "Priority Support"
    ]
  }
]

const Plans = () => {
  const navigate = useNavigate()

  return (
    <section className="plans-section h-4" id='plans'>

      <h1 className="plans-title text-center mb-7 mt-4">
        Choose Your Plan
      </h1>

      <div className="plan-container">

        {plans.map((plan, index) => (
          <div 
            className={`plan-card ${plan.popular ? "gold" : ""}`} 
            key={index}
          >

            {plan.popular && (
              <span className="popular">Most Popular</span>
            )}

            <h2 className="plan-name">{plan.name}</h2>

            <p className="plan-price">{plan.price}</p>

            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            
            <button 
              className="plan-btn"
              onClick={() => navigate('/join')}
            >
              Sign Up Now
            </button>

          </div>
        ))}

      </div>

    </section>
  )
}

export default Plans
