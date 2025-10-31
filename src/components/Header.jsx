// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';
import styles from './Header.module.css';

function Header() {
  const [theme, toggleTheme] = useDarkMode();

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink className={styles.logo} to="/">
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>Aqib Raza</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className={styles.desktopNav}>
          <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
          <NavLink to="/projects" className={getNavLinkClass}>Projects</NavLink>
          <NavLink to="/skills" className={getNavLinkClass}>Skills</NavLink>
          {/* Add other links here */}
          <NavLink to="/certificates" className={getNavLinkClass}>Certificates</NavLink>
          <NavLink to="/articles" className={getNavLinkClass}>Articles</NavLink>
          <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
          <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
        </div>

        <div className={styles.controls}>
          <button className={styles.themeToggle} onClick={toggleTheme}>
            {theme === 'light' ? (
              <span className="material-symbols-outlined">dark_mode</span>
            ) : (
              <span className="material-symbols-outlined">light_mode</span>
            )}
          </button>
          <button className={styles.mobileMenuButton}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;