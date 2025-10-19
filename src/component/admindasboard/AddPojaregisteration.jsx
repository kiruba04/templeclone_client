import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Alert,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import './main.css';
import Addspecial from './Addspecialappointment';

const AddAppointment = () => {
  const [poojas, setPoojas] = useState([]);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);
  const [tokenNumber, setTokenNumber] = useState(null);
  const [totalToken, setTotalToken] = useState('');

  useEffect(() => {
    axios.get('https://venkatesaperumal-backend.onrender.com/api/poojas')
      .then(response => setPoojas(response.data))
      .catch(error => console.error('Error fetching poojas:', error));
  }, []);

  const handleRegisterClick = (pooja) => {
    setSelectedPooja(pooja);
    setShowModal(true);
    generateAvailableDays(pooja.availableAppointments);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPooja(null);
    setPhone('');
    setUserId(null);
    setError('');
    setDate('');
    setTime('');
    setTokenNumber(null);
    setAvailableDays([]);
  };

  const handleVerifyPhone = async () => {
    try {
      const response = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/users/phone?phone=${phone}`);
      setUserId(response.data._id);
      setError(`User name :${response.data.username}`);
        
    } catch (error) {
      setError('User not found');
      setUserId(null);
    }
  };

  const generateAvailableDays = (availableAppointments) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const availableDays = [];

    for (let i = 0; i < 14; i++) {
      const currentDay = new Date();
      currentDay.setDate(currentDay.getDate() + i);
      const dayName = daysOfWeek[currentDay.getDay()];

      const dayInfo = availableAppointments.find(appointment => appointment.Day === dayName && appointment.available);
      if (dayInfo) {
        availableDays.push({
          date: currentDay.toISOString().split('T')[0],
          ...dayInfo
        });
      }
    }

    setAvailableDays(availableDays);
  };

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
    const dayInfo = availableDays.find(day => day.date === selectedDate);
    setSelectedDayInfo(dayInfo);
    if (dayInfo) {
      setTime(`${dayInfo.startTime} - ${dayInfo.endTime}`);
      setTotalToken(dayInfo.availaableslots);
      
      try {
        const response = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/register/bydate?poojaid=${selectedPooja._id}&date=${selectedDate}`);
        const existingRegistrations = response.data;
        const tokenNumber = existingRegistrations.length + 1;

        if (tokenNumber <= dayInfo.availaableslots) {
          setTokenNumber(tokenNumber);
        } else {
          setTokenNumber("full");
          setError("Appointment full");
        }
      } catch (error) {
        console.error(error);
        setTokenNumber("Error fetching appointments");
      }
    } else {
      setTime('');
      setTokenNumber(null);
    }
  };

  const handleRegister = async () => {
    if (!userId) {
      setError('Please verify your phone number first');
      return;
    }

    if (tokenNumber === "full" || tokenNumber === "Error fetching appointments") {
      setError("Cannot book appointment: Slots are full or there was an error.");
      return;
    }

    const newRegistration = {
      userid: userId,
      poojaid: selectedPooja._id,
      date: date,
      day: new Date(date).toLocaleString('en-US', { weekday: 'long' }),
      time: time,
      tokennumber: tokenNumber,
    };

    try {
      const response = await axios.post('https://venkatesaperumal-backend.onrender.com/api/register', newRegistration);
      console.log(response.data);
      handleModalClose();
    } catch (error) {
      console.error(error);
      setError('Error creating registration');
    }
  };

  return (
    <div>
      <h2 className='heading'>Make Registration</h2>
      <div className="card-container">
        {poojas.map((pooja) => (
          <Card key={pooja._id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title className='title'>{pooja.poojaname}</Card.Title>
              <Card.Text>
                <div>Fees: {pooja.poojacharges}<br /></div>
                <div>No. of Persons: {pooja.noofperson}<br /></div>
               <div> Items: {pooja.items.join(', ')}<br /></div>
               <div> Available Token: {pooja.availableAppointments.map(a => `${a.Day}: ${a.availaableslots}`).join(', ')}</div>
              </Card.Text>
              <Button variant="primary" onClick={() => handleRegisterClick(pooja)}>Register</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register for {selectedPooja?.poojaname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
              <Button className='placement' onClick={handleVerifyPhone}>Verify</Button>
              {error && (
                    <Row className="mb-3">
                        <Col>
                            <Alert variant={userId ? "success" : "danger"}>
                                {error}
                            </Alert>
                        </Col>
                    </Row>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                as="select"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                required
              >
                <option value="">Select a date</option>
                {availableDays.map((day, index) => (
                  <option key={index} value={day.date}>
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {selectedDayInfo && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Available Time</Form.Label>
                  <Form.Control
                    type="text"
                    value={time}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Total Token</Form.Label>
                  <Form.Control
                    type="text"
                    value={totalToken}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Token Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={tokenNumber}
                    readOnly
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
          <Button variant="primary" onClick={handleRegister}>Register</Button>
        </Modal.Footer>
      </Modal>
      <Addspecial/>
    </div>
  );
};

export default AddAppointment;
