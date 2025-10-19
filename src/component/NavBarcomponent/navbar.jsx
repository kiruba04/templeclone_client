import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import './navbar.css';

function NavbarComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUser, setStoredUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation(); // useTranslation hook

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://venkatesaperumal-backend.onrender.com/api/auth/checkAuth', {
          withCredentials: true
        });
        if (response.data.auth && response.data.isLoggedIn) {
          const user = JSON.parse(localStorage.getItem('user'));
          setStoredUser(user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status', error);
      }
    };

    checkLoginStatus();

    // Check if language is saved in localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleLogout = async () => {
    try {
      await axios.post('https://venkatesaperumal-backend.onrender.com/api/auth/logout', {}, {
        withCredentials: true
      });

      document.cookie = 'access_token=; max-age=0; domain=localhost; path=/';
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  // Handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Store selected language in localStorage
    localStorage.setItem('language', lng);
  };

  // Check if current language is Tamil
  const isTamil = i18n.language === 'ta';

  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} bg="light" className={`mb-3 navwidth fixed-top ${isTamil ? 'tamil-font' : ''}`}>
          <Container fluid>
            <Navbar.Brand href="/" className={`headerfont ${isTamil ? 'tamil-font' : ''}`}>
              {t('templeName')}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className={isTamil ? 'tamil-font' : ''}>
                  {t('templeName')}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className={`justify-content-center flex-grow-1 pe-3 d-flex gap-3 ${isTamil ? 'tamil-font' : ''}`}>
                  <Nav.Link href="/" className={location.pathname === '/' ? 'active-link' : ''}>{t('home')}</Nav.Link>
                  <Nav.Link href="/history" className={location.pathname === '/history' ? 'active-link' : ''}>{t('history')}</Nav.Link>
                  <Nav.Link href="/event" className={location.pathname ==='/event' ? 'active-link' :''}>{t('event')}</Nav.Link>
                  <Nav.Link href="/gallery" className={location.pathname === '/gallery' ? 'active-link' : ''}>{t('gallery')}</Nav.Link>
                  <Nav.Link href="/festival" className={location.pathname === '/festival' ? 'active-link' : ''}>{t('festival')}</Nav.Link>
                  <Nav.Link href="/pooja" className={location.pathname === '/pooja' ? 'active-link' : ''}>{t('pooja')}</Nav.Link>
                  <Nav.Link href="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>{t('contact')}</Nav.Link>
                  <Nav.Link href="/feedback" className={location.pathname === '/feedback' ? 'active-link' : ''}>{t('feedback')}</Nav.Link>
                  {isLoggedIn && storedUser ? (
                    <>
                     <Nav.Link 
                        href={
                          storedUser.isAdmin 
                            ? '/admin' 
                            : storedUser.userType === 'trustee' 
                              ? '/feedbackreview' 
                              : '/dashboard'
                        }
                      >
                        {storedUser.username.length > 5 
                          ? `${storedUser.username.substring(0, 5)}..` 
                          : storedUser.username}
                      </Nav.Link>

                      <Button variant="outline-danger" onClick={handleLogout}>{t('logout')}</Button>
                    </>
                  ) : (
                    <>
                      <Button className="custom-outline" onClick={handleLogin}>{t('login')}</Button>
                      <Button className="custom-outline" onClick={handleSignUp}>{t('signup')}</Button>
                    </>
                  )}
                </Nav>
                <Nav className='justify-content-end'>
                  <Nav.Link onClick={() => changeLanguage('en')}>English</Nav.Link>
                  <Nav.Link onClick={() => changeLanguage('ta')}>தமிழ்</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarComponent;
