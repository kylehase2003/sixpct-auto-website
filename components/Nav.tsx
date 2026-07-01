'use client';

import { useState } from 'react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav>
        <a href="/" className="nav-logo">
          <img src="/images/logo.png" alt="Six% Auto" />
        </a>
        <ul className="nav-links">
          <li><a href="#where-we-come-in">How It Works</a></li>
          <li><a href="#services-v2">Services</a></li>
          <li><a href="#manual-tax">Calculator</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Book a Call</a>

      </nav>

      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        <a href="#where-we-come-in" onClick={closeMenu}>How It Works</a>
        <a href="#services-v2" onClick={closeMenu}>Services</a>
        <a href="#manual-tax" onClick={closeMenu}>Calculator</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" className="nav-cta" onClick={closeMenu}>Book a Call</a>
      </div>
    </>
  );
}
