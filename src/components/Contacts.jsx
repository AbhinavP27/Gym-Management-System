import React from 'react'
import './style/Contacts.css'

const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section className='contact-section' id='contact'>
      <div className='contact-container'>
        <div className='contact-copy'>
          <p className='contact-kicker'>Get in touch</p>
          <h2>Ready to level up?</h2>
          <p className='contact-lead'>
            Tell us what you are training for and we will craft a plan that fits your schedule, goals, and experience level. No spam, just a quick response from our coaching team.
          </p>

          <div className='contact-details'>
            <div className='detail-card'>
              <span className='label'>Call :</span>
              <a href='tel:+91-9995161150'> +91-9995161150</a>
            </div>
            <div className='detail-card'>
              <span className='label'>Email :</span>
              <a href='mailto:hello@urbangrind.fit'> hello@urbangrind.fit</a>
            </div>
            <div className='detail-card'>
              <span className='label'>Visit</span>
              <p>123 Kovilakam Downtown , Suite 4B, Chazhoor</p>
            </div>
          </div>

          <div className='hours'>
            <span className='label'>Hours</span>
            <p>Mon - Fri: 5:00 AM - 11:00 PM</p>
            <p>Sat - Sun: 7:00 AM - 9:00 PM</p>
          </div>
        </div>

        <form className='contact-form' onSubmit={handleSubmit}>
          <div className='form-row'>
            <div className='field'>
              <label htmlFor='name'>Name</label>
              <input id='name' type='text' placeholder='jake Johnson' />
            </div>
            <div className='field'>
              <label htmlFor='email'>Email</label>
              <input id='email' type='email' placeholder='you@example.com' />
            </div>
          </div>

          <div className='form-row'>
            <div className='field'>
              <label htmlFor='phone'>Phone</label>
              <input id='phone' type='tel' placeholder='+91-9995131214' />
            </div>
            <div className='field'>
              <label htmlFor='goal'>Primary goal</label>
              <select id='goal' defaultValue=''>
                <option value='' disabled>
                  Choose one
                </option>
                <option>Build strength</option>
                <option>Lose fat</option>
                <option>Improve endurance</option>
                <option>Sports performance</option>
                <option>General fitness</option>
              </select>
            </div>
          </div>

          <div className='field'>
            <label htmlFor='message'>How can we help?</label>
            <textarea
              id='message'
              rows='4'
              placeholder='Share your timeline, injuries, or anything we should know.'
            ></textarea>
          </div>

          <button type='submit' className='contact-btn'>
            Book a free consult
          </button>
          <p className='response-note'>We reply within one business day.</p>
        </form>
      </div>
    </section>
  )
}

export default Contacts
