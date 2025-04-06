import React from 'react';
import Nav from './Nav';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Little Lemon Logo" className="logo" />
        <Nav />
      </div>
    </header>
  );
}

export default Header;