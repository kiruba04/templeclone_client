import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, Button, Form, Row, Col } from 'react-bootstrap';
import './main.css';

const AddEvent = () => {
  const [poojas, setPoojas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    poojaname: '',
    poojacharges: '',
    noofperson:'',
    items: [],
    availableAppointments: [
      { Day: 'Monday', available: false, startTime: '', endTime: '', availaableslots: 0 },
      { Day: 'Tuesday', available: false, startTime: '', endTime: '', availaableslots: 0 },
      { Day: 'Wednesday', available: false, startTime: '', endTime: '', availaableslots: 0 },
      { Day: 'Thursday', available: false, startTime: '', endTime: '', availaableslots: 0 },
      { Day: 'Friday', available: false, startTime: '', endTime: '', availaableslots: 0 },
      { Day: 'Saturday', available: false, startTime: '', endTime: '', availaableslots: 0 },
      { Day: 'Sunday', available: false, startTime: '', endTime: '', availaableslots: 0 },
    ],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoojaId, setEditingPoojaId] = useState(null);

  useEffect(() => {
    fetchPoojas();
  }, []);

  const fetchPoojas = async () => {
    try {
      const response = await axios.get('https://venkatesaperumal-backend.onrender.com/api/poojas', {
        withCredentials: true
      });
      setPoojas(response.data);
    } catch (error) {
      console.error('Error fetching poojas', error);
    }
  };

  const handleAddPooja = async () => {
    try {
      const response = await axios.post('https://venkatesaperumal-backend.onrender.com/api/poojas', formData, {
        withCredentials: true
      });
      setPoojas([...poojas, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding pooja', error);
    }
  };

  const handleEditPooja = async () => {
    try {
      const response = await axios.put(`https://venkatesaperumal-backend.onrender.com/api/poojas/${editingPoojaId}`, formData, {
        withCredentials: true
      });
      const updatedPoojas = poojas.map((pooja) =>
        pooja._id === editingPoojaId ? response.data : pooja
      );
      setPoojas(updatedPoojas);
      resetForm();
    } catch (error) {
      console.error('Error editing pooja', error);
    }
  };

  const handleDeletePooja = async (id) => {
    try {
      await axios.delete(`https://venkatesaperumal-backend.onrender.com/api/poojas/${id}`, {
        withCredentials: true
      });
      setPoojas(poojas.filter((pooja) => pooja._id !== id));
    } catch (error) {
      console.error('Error deleting pooja', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleEditPooja();
    } else {
      handleAddPooja();
    }
  };

  const handleEditClick = (pooja) => {
    setFormData({
      poojaname: pooja.poojaname,
      poojacharges: pooja.poojacharges,
      noofperson: pooja.noofperson,
      items: pooja.items, // Set items from the edited pooja
      availableAppointments: pooja.availableAppointments.map((appointment) => ({
        ...appointment,
        availaableslots: appointment.availaableslots || 0 // Initialize if not present
      })),
    });
    setIsEditing(true);
    setEditingPoojaId(pooja._id);
    setFormVisible(true);
  };

  const resetForm = () => {
    setFormData({
      poojaname: '',
      poojacharges: '',
      noofperson: '',
      items: [], // Reset items array
      availableAppointments: [
        { Day: 'Monday', available: false, startTime: '', endTime: '', availaableslots: 0 },
        { Day: 'Tuesday', available: false, startTime: '', endTime: '', availaableslots: 0 },
        { Day: 'Wednesday', available: false, startTime: '', endTime: '', availaableslots: 0 },
        { Day: 'Thursday', available: false, startTime: '', endTime: '', availaableslots: 0 },
        { Day: 'Friday', available: false, startTime: '', endTime: '', availaableslots: 0 },
        { Day: 'Saturday', available: false, startTime: '', endTime: '', availaableslots: 0 },
        { Day: 'Sunday', available: false, startTime: '', endTime: '', availaableslots: 0 },
      ],
    });
    setIsEditing(false);
    setEditingPoojaId(null);
    setFormVisible(false);
  };

  const handleAvailabilityChange = (day, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      availableAppointments: prevData.availableAppointments.map((appointment) =>
        appointment.Day === day ? { ...appointment, [field]: value } : appointment
      ),
    }));
  };
  const handleItemChange = (e, index) => {
    const newItems = [...formData.items];
    newItems[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  const handleAddItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [...prevData.items, ''], // Add an empty string for a new item
    }));
  };
  const handleRemoveItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };
  const renderItemsField = (item, index) => (
    <div key={`item-${index}`} className="mb-3">
      <Form.Group as={Row}>
        <Form.Label column sm="2">Item {index + 1}</Form.Label>
        <Col sm="8">
          <Form.Control
            type="text"
            placeholder={`Enter item ${index + 1}`}
            value={item}
            onChange={(e) => handleItemChange(e, index)}
            required
          />
        </Col>
        <Col sm="2">
          <Button variant="danger" onClick={() => handleRemoveItem(index)}>Remove</Button>
        </Col>
      </Form.Group>
    </div>
  );

  const renderAvailabilityFields = (appointment) => (
    <div key={appointment.Day}>
      <Form.Group className="mb-3">
        <Form.Label>{appointment.Day}</Form.Label>
        <Form.Check
          type="checkbox"
          label="Available"
          checked={appointment.available}
          onChange={(e) => handleAvailabilityChange(appointment.Day, 'available', e.target.checked)}
        />
        {appointment.available && (
          <>
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={appointment.startTime}
              onChange={(e) => handleAvailabilityChange(appointment.Day, 'startTime', e.target.value)}
              required
            />
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={appointment.endTime}
              onChange={(e) => handleAvailabilityChange(appointment.Day, 'endTime', e.target.value)}
              required
            />
            <Form.Label>Available Token</Form.Label>
            <Form.Control
              type="number"
              value={appointment.availaableslots}
              onChange={(e) => handleAvailabilityChange(appointment.Day, 'availaableslots', parseInt(e.target.value))}
              required
            />
          </>
        )}
      </Form.Group>
    </div>
  );

  return (
    <div>
      <h1 className='heading'>Pooja Management</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pooja Name</th>
            <th>Pooja Charges</th>
            <th>No of Person per Token</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {poojas.map((pooja) => (
            <tr key={pooja._id}>
              <td>{pooja.poojaname}</td>
              <td>{pooja.poojacharges}</td>
              <td>{pooja.noofperson}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(pooja)}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => handleDeletePooja(pooja._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Hide Form' : 'Add Pooja'}
      </Button>
      {formVisible && (
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Pooja Name</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter pooja name"
                value={formData.poojaname}
                onChange={(e) => setFormData({ ...formData, poojaname: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Pooja Charges</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter pooja charges"
                value={formData.poojacharges}
                onChange={(e) => setFormData({ ...formData, poojacharges: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">No of person per Token</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter No of person per slot "
                value={formData.noofperson}
                onChange={(e) => setFormData({ ...formData, noofperson: e.target.value })}
                required
              />
            </Col>
            <Form.Group className="mb-3">
            <Form.Label>Items</Form.Label>
            {formData.items.map((item, index) => renderItemsField(item, index))}
            <Button className='placement' variant="secondary" onClick={handleAddItem}>Add Item</Button>
          </Form.Group>


          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Available Appointments</Form.Label>
            {formData.availableAppointments.map((appointment) => renderAvailabilityFields(appointment))}
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Add Pooja'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddEvent;
