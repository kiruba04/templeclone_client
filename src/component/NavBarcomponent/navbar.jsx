import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import './navbar.css';

function NavbarComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUser, setStoredUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('https://templeclone-backend.onrender.com/api/auth/checkAuth', {
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

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleLogout = async () => {
    try {
      await axios.post('https://templeclone-backend.onrender.com/api/auth/logout', {}, {
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

  const handleLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/signup');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const isTamil = i18n.language === 'ta';

  // Flat nav items (history & kammavar removed — now in dropdown)
  const navItems = [
    { path: '/', key: 'home' },
    { path: '/event', key: 'event' },
    { path: '/gallery', key: 'gallery' },
    { path: '/pooja', key: 'Pooja Register and Donations' },
    { path: '/contact', key: 'contact' },
    { path: '/feedback', key: 'feedback' },
  ];

  const getDashboardPath = (user) => {
    if (!user) return '/dashboard';
    if (user.isAdmin) return '/admin';
    if (user.userType === 'trustee') return '/feedbackreview';
    return '/dashboard';
  };

  const renderUserControls = () => {
    if (isLoggedIn && storedUser) {
      const displayName = storedUser.username
        ? (storedUser.username.length > 5 ? `${storedUser.username.substring(0, 5)}..` : storedUser.username)
        : 'User';
      return (
        <>
          <Nav.Link href={getDashboardPath(storedUser)}>{displayName}</Nav.Link>
          <Button variant="outline-danger" onClick={handleLogout}>{t('logout')}</Button>
        </>
      );
    }

    return (
      <>
        <Button className="custom-outline" onClick={handleLogin}>{t('login')}</Button>
        <Button className="custom-outline" onClick={handleSignUp}>{t('signup')}</Button>
      </>
    );
  };


  return (
    <>
      {['lg'].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          bg="light"
          className={`mb-3 navwidth fixed-top ${isTamil ? 'tamil-font' : ''}`}
        >
          <Container fluid>
            <Navbar.Brand href="/" className={`headerfont ${isTamil ? 'tamil-font' : 'eng-font'}`}>
              {isTamil ? (
                <>
                  ஸ்ரீ நனம்மதேவி,
                  <br />
                  ஸ்ரீ விஜயநாராயண சௌதரல்லு கோயில்
                </>
              ) : (
                <>
                  Sri Nanammadevi,
                  <br />
                  Sri Vijayanarayana Saudharallu Temple
                </>
              )}
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className={isTamil ? 'tamil-font text-center' : 'text-center'}
                >
                  {isTamil ? (
                    <>
                      ஸ்ரீ நனம்மதேவி,
                      <br />
                      ஸ்ரீ விஜயநாராயண சௌதரல்லு கோயில்
                    </>
                  ) : (
                    <>
                      Sri Nanammadevi,
                      <br />
                      Sri Vijayanarayana Saudharallu Temple
                    </>
                  )}
                </Offcanvas.Title>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className={`justify-content-center flex-grow-1 pe-3 d-flex gap-3 ${isTamil ? 'tamil-font' : ''}`}>
                  {navItems.map((item) => (
                    <Nav.Link
                      key={item.path}
                      href={item.path}
                      className={location.pathname === item.path ? 'active-link' : ''}
                    >
                      {t(item.key)}
                    </Nav.Link>
                  ))}

                  {/* History dropdown */}
                  <NavDropdown
                    title={t('history') || 'History'}
                    id="nav-dropdown-history"
                    align="end"
                  >
                    <NavDropdown.Item href="/history" className={location.pathname === '/history' ? 'active-link' : ''}>
                      {t('Temple history') || 'Temple history'}
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/kammavar" className={location.pathname === '/kammavar' ? 'active-link' : ''}>
                      {t('Kammavar') || 'Kammavar'}
                    </NavDropdown.Item>
                  </NavDropdown>

                  {renderUserControls()}
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
