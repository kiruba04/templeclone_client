import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Adjust the path as needed
import Home from './Home'; // Adjust the path as needed
import AddEvents from './AddPooja.jsx'; // Adjust the path as needed
import AddAppointment from './AddPojaregisteration.jsx'; // Adjust the path as needed
import ViewAppointments from './ViewPojaregisteration.jsx'; // Adjust the path as needed
import AddspecialEvents  from './Addspecialpooja';
import Devotes from './Devotes';
import Thirukalayanam from './Thirukalayanam';
import Volunteer from './Volunteerview';
import Specialdevotee from './SpecialDevotee';
import Utchavam from './Utchavam.jsx'
import News from './Newsheadline.jsx';
import Inventorymain from './inventory/Inventorymain.jsx';
import Gallery from './Gallery.jsx';
import Trustee from './Trustee.jsx';
import './main.css'; // Optional: Custom CSS for styling

const MainComponent = () => {
  // Initialize the view state from local storage or default to 'home'
  const [view, setView] = useState(() => localStorage.getItem('view') || 'home');

  // Update local storage whenever view changes
  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={2} className="p-0">
          <Sidebar setView={setView} view={view} />
        </Col>
        <Col md={10} className="p-4">
          {view === 'home' && <Home />}
          {view === 'addNews' && <News />}
          {view === 'gallery' && <Gallery />}
          {view === 'inventory' && <Inventorymain />}
          {view === 'addEvents' && <AddEvents />}
          {view === 'addAppointment' && <AddAppointment />}
          {view === 'Thirukalayanam' && <Thirukalayanam />}
          {view === 'viewAppointments' && <ViewAppointments />}
          {view === 'SpecialEvents' && <AddspecialEvents />}
          {view === 'devotes' && <Devotes />}
          {view === 'volunteer' && <Volunteer />}
          {view === 'specialdevotee' && <Specialdevotee />}
          {view === 'trustee' && <Trustee />}
          {view === 'Utchavam' && <Utchavam />}
        </Col>
      </Row>
    </Container>
  );
};

export default MainComponent;
