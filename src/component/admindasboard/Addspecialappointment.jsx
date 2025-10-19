import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './main.css';

const Addspecialappointment = () => {
  const [poojas, setPoojas] = useState([]);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [tokenNumber, setTokenNumber] = useState(null);

  useEffect(() => {
    axios.get('https://templeclone-backend.onrender.com/api/specialPoojas')
      .then(response => setPoojas(response.data))
      .catch(error => console.error('Error fetching poojas:', error));
  }, []);

  const handleRegisterClick = (pooja) => {
    setSelectedPooja(pooja);
    setShowModal(true);
    
    handleDateChange(pooja.date,pooja._id,pooja.token);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPooja(null);
    setPhone('');
    setUserId(null);
    setError('');
    setTokenNumber(null);
  };

  const handleVerifyPhone = async () => {
    try {
      const response = await axios.get(`https://templeclone-backend.onrender.com/api/users/phone?phone=${phone}`);
      setUserId(response.data._id);
      setError(`User name: ${response.data.username}`);
    } catch (error) {
      setError('User not found');
      setUserId(null);
    }
  };

  const handleDateChange = async (selectedDate,id,token) => {
    try {
      const response = await axios.get(`https://templeclone-backend.onrender.com/api/specialregister/register/bydate?poojaid=${id}&date=${selectedDate}`);
      const existingRegistrations = response.data;
      const tokenNumber = existingRegistrations.length + 1;
      console.log(tokenNumber);
      if (tokenNumber <= token) {
        setTokenNumber(tokenNumber);
      } else {
        setTokenNumber("full");
        setError("Appointment full");
      }
    } catch (error) {
      console.error(error);
      setTokenNumber("Error fetching appointments");
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
      date: selectedPooja.date,
      day: new Date(selectedPooja.date).toLocaleString('en-US', { weekday: 'long' }),
      tokennumber: tokenNumber,
    };

    try {
      const response = await axios.post('https://templeclone-backend.onrender.com/api/register', newRegistration);
      console.log(response.data);
      handleModalClose();
    } catch (error) {
      console.error(error);
      setError('Error creating registration');
    }
  };

  return (
    <div>
      <h2 className='heading'>Make Special pooja Registration</h2>
      <div className="card-container">
        {poojas.map((pooja) => (
          <Card key={pooja._id} style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title className='title'>{pooja.poojaname}</Card.Title>
              <Card.Text>
                <div>Fees: {pooja.poojacharges}<br /></div>
                <div>No. of Persons: {pooja.noofperson}<br /></div>
                <div>Items: {pooja.items.join(', ')}<br /></div>
                <div>Date: {new Date(pooja.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br /></div>
                <div>Time: {pooja.starttime} - {pooja.endtime}<br /></div>
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

            {selectedPooja && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Available Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={new Date(selectedPooja.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Available Time</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${selectedPooja.starttime} - ${selectedPooja.endtime}`}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Total Token</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPooja.token}
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
    </div>
  );
};

export default Addspecialappointment;
