import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src={logo} alt="Little Lemon Logo" className="footer-logo" />
        </div>
        <div className="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/booking">Reservations</Link></li>
            <li><Link to="/order">Order Online</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <address>
            <p>123 Main Street, Chicago, IL</p>
            <p>Phone: (312) 555-1234</p>
            <p>Email: info@littlelemon.com</p>
          </address>
        </div>
        <div className="footer-section">
          <h3>Social Media</h3>
          <ul className="social-links">
            <li><a href="https://facebook.com" aria-label="Facebook">Facebook</a></li>
            <li><a href="https://instagram.com" aria-label="Instagram">Instagram</a></li>
            <li><a href="https://twitter.com" aria-label="Twitter">Twitter</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>© 2023 Little Lemon Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;