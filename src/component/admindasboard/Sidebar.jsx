import React from 'react';
import { Nav } from 'react-bootstrap';
import './sidebar.css'; // Optional: Custom CSS for styling
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ setView, view }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('https://venkatesaperumal-backend.onrender.com/api/auth/logout', {}, {
        withCredentials: true // Ensure cookies are sent
      });

      // Delete the 'access_token' cookie
      document.cookie = 'access_token=; max-age=0; domain=localhost; path=/';
      localStorage.removeItem('user');

      // Update local state to reflect logout
      
      navigate('/');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };
  return (
    <Nav className="flex-column sidebar">
      <Nav.Link active={view === 'home'} onClick={() => setView('home')} className={`sidenavfont ${view === 'home' ? 'active' : ''}`}>
        Home
      </Nav.Link>
      <Nav.Link active={view === 'addNews'} onClick={() => setView('addNews')} className={`sidenavfont ${view === 'addNews' ? 'active' : ''}`}>
        Add News
      </Nav.Link>
      <Nav.Link active={view === 'gallery'} onClick={() => setView('gallery')} className={`sidenavfont ${view === 'gallery' ? 'active' : ''}`}>
        Gallery
      </Nav.Link>
      <Nav.Link active={view === 'inventory'} onClick={() => setView('inventory')} className={`sidenavfont ${view === 'inventory' ? 'active' : ''}`}>
        Inventory Management
      </Nav.Link>

      <Nav.Link active={view === 'addEvents'} onClick={() => setView('addEvents')} className={`sidenavfont ${view === 'addEvents' ? 'active' : ''}`}>
        Pooja
      </Nav.Link>
      <Nav.Link active={view === 'SpecialEvents'} onClick={() => setView('SpecialEvents')} className={`sidenavfont ${view === 'SpecialEvents' ? 'active' : ''}`}>
      Special Pooja
      </Nav.Link>
      <Nav.Link active={view === 'Utchavam'} onClick={() => setView('Utchavam')} className={`sidenavfont ${view === 'Utchavam' ? 'active' : ''}`}>
      Festival
      </Nav.Link>
      <Nav.Link active={view === 'Thirukalayanam'} onClick={() => setView('Thirukalayanam')} className={`sidenavfont ${view === 'Thirukalayanam' ? 'active' : ''}`}>
      Thirukalyanam
      </Nav.Link>
      <Nav.Link active={view === 'addAppointment'} onClick={() => setView('addAppointment')} className={`sidenavfont ${view === 'addAppointment' ? 'active' : ''}`}>
       Registeration
      </Nav.Link>
      <Nav.Link active={view === 'devotes'} onClick={() => setView('devotes')} className={`sidenavfont ${view === 'devotes' ? 'active' : ''}`}>
        Devotes
      </Nav.Link>
      <Nav.Link active={view === 'volunteer'} onClick={() => setView('volunteer')} className={`sidenavfont ${view === 'volunteer' ? 'active' : ''}`}>
        Volunteer
      </Nav.Link>
      <Nav.Link active={view === 'specialdevotee'} onClick={() => setView('specialdevotee')} className={`sidenavfont ${view === 'specialdevotee' ? 'active' : ''}`}>
        Special Devotee
      </Nav.Link>
      <Nav.Link active={view === 'trustee'} onClick={() => setView('trustee')} className={`sidenavfont ${view === 'trustee' ? 'active' : ''}`}>
        Trustee
      </Nav.Link>
      <Nav.Link active={view === 'viewAppointments'} onClick={() => setView('viewAppointments')} className={`sidenavfont ${view === 'viewAppointments' ? 'active' : ''}`}>
        View Registration
      </Nav.Link>
      <div className="logout-container">
        <Button variant="outline-danger" className="logoutbtn" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </Nav>
  );
};

export default Sidebar;
