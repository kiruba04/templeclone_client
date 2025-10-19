import React, { useState, useEffect } from 'react';
import './bgfestival.css';

const BGFestival = () => {
  const [language, setLanguage] = useState(localStorage.getItem('language'));

  useEffect(() => {
    const handleStorageChange = () => {
      setLanguage(localStorage.getItem('language'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={language === 'ta' ? 'homelarge' : 'homebackground2'}>
      <div className="backopacity2"></div>
    </div>
  );
};

export default BGFestival;
