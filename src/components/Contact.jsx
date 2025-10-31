import React, { useState } from 'react';
// Make sure this hook is in the same folder or update the path
import useIntersectionObserver from '../pages/useIntersectionObserver'; 
import styles from './Contact.module.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Animation hook
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- Simulation of a form submission ---
    // In a real app, you'd send this data to a backend or service
    console.log({ name, email, message });
    alert('Thank you for your message! I will get back to you soon.');
    // Clear the form
    setName('');
    setEmail('');
    setMessage('');
    // ----------------------------------------
  };

  const className = `${styles.contactSection} ${
    isIntersecting ? styles.isVisible : ''
  }`;

  return (
    <section id="contact" ref={ref} className={className}>
      <h2 className={styles.contactHeadline}>Get In Touch</h2>
      <p className={styles.contactSubheadline}>
        --------------------------------------------------------------------------
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            className={`${styles.input} ${styles.textarea}`}
            rows="6"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;