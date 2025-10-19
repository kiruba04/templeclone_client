import React from 'react';
import './Footer.css'; // Optional: Include any styling if necessary

const Footer = () => {
  return (
    <footer className="footer">
      <p className='notextindent'>
        © 2024 developed and owned by{' '}
        <a 
          href="https://sriethirajatechnologies.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          Sri Ethiraja Technologies
        </a>
      </p>
    </footer>
  );
};

export default Footer;
