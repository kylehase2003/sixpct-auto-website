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
          <li><a href="#services">Services</a></li>
          <li><a href="#where-we-come-in">Capabilities</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Book a Call</a>

        <button
          className="mobile-toggle"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="3" y1="18" x2="21" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' active' : ''}`}>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#where-we-come-in" onClick={closeMenu}>Capabilities</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a href="#contact" className="nav-cta" onClick={closeMenu}>Book a Call</a>
      </div>
    </>
  );
}
