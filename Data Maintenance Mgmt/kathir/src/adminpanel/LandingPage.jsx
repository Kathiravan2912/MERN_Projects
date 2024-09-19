import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <h1>Bank Data Storage System</h1>
        <nav>
          <ul>
            <Link to="/sidebar">
            <li><a href="#home">Home</a></li></Link>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <section id="home" className="section">
        <h2>Welcome to Our Bank Data Storage System</h2>
        <p>Securely manage and store your banking data with ease.</p>
      </section>

      <section id="about" className="section">
        <h2>About Us</h2>
        <p>We provide top-notch data storage solutions for banks with a focus on security and reliability.</p>
      </section>

      <section id="services" className="section">
        <h2>Our Services</h2>
        <ul>
          <li>Secure Data Storage</li>
          <li>Data Backup and Recovery</li>
          <li>Data Analytics and Reporting</li>
        </ul>
      </section>

      <section id="contact" className="section">
        <h2>Contact Us</h2>
        <p>Email: support@bankdata.com</p>
        <p>Phone: 123-456-7890</p>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Bank Data Storage System</p>
      </footer>
    </div>
  )
}

export default LandingPage