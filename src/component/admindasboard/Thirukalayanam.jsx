import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import './main.css';

const AddEvent = () => {
  const [events, setEvents] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    poojaname: 'Thirukalyanam',
    poojacharges: '',
    noofperson: '',
    items: [],
    date: '',
    starttime: '',
    endtime: '',
    devotename: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [dateConflict, setDateConflict] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://templeclone-backend.onrender.com/api/thirukalayanam');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events', error);
    }
  };

  const checkDateConflict = async (date) => {
    try {
      const response = await axios.get(`https://templeclone-backend.onrender.com/api/thirukalayanam/getEventByDate?date=${date}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking date conflict', error);
      return false;
    }
  };

  const handleAddEvent = async () => {
    try {
      const conflict = await checkDateConflict(formData.date);
      if (conflict) {
        setDateConflict(true);
        return;
      }

      const response = await axios.post('https://templeclone-backend.onrender.com/api/thirukalayanam', formData);
      setEvents([...events, response.data]);
      resetForm();
    } catch (error) {
      console.error('Error adding event', error);
    }
  };

  const handleEditEvent = async () => {
    try {
      const response = await axios.put(`https://templeclone-backend.onrender.com/api/thirukalayanam/${editingEventId}`, formData);
      const updatedEvents = events.map((event) =>
        event._id === editingEventId ? response.data : event
      );
      setEvents(updatedEvents);
      resetForm();
    } catch (error) {
      console.error('Error editing event', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`https://templeclone-backend.onrender.com/api/thirukalayanam/${id}`);
      setEvents(events.filter((event) => event._id !== id));
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleEditEvent();
    } else {
      handleAddEvent();
    }
  };

  const handleEditClick = (event) => {
    setFormData({
      poojaname: event.poojaname,
      poojacharges: event.poojacharges,
      noofperson: event.noofperson,
      items: event.items,
      date: event.date,
      starttime: event.starttime,
      endtime: event.endtime,
      devotename: event.devotename,
      phone: event.phone
    });
    setIsEditing(true);
    setEditingEventId(event._id);
    setFormVisible(true);
  };

  const resetForm = () => {
    setFormData({
      poojaname: 'Thirukalyanam',
      poojacharges: '',
      noofperson: '',
      items: [],
      date: '',
      starttime: '',
      endtime: '',
      devotename: '',
      phone: ''
    });
    setIsEditing(false);
    setEditingEventId(null);
    setFormVisible(false);
    setDateConflict(false);
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
      items: [...prevData.items, ''],
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

  return (
    <div>
      <h1 className='heading'>Thirukalyanam Management</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Pooja Name</th>
            <th>Pooja Charges</th>
            <th>No of Persons</th>
            <th>Devotee Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.poojaname}</td>
              <td>{event.poojacharges}</td>
              <td>{event.noofperson}</td>
              <td>{event.devotename}</td>
              <td>{event.phone}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.starttime}</td>
              <td>{event.endtime}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(event)}>Edit</Button>
                {' '}
                <Button variant="danger" onClick={() => handleDeleteEvent(event._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Hide Form' : 'Add Thirukalayanam'}
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
               readOnly
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
            <Form.Label column sm="2">No of Persons</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter no of persons"
                value={formData.noofperson}
                onChange={(e) => setFormData({ ...formData, noofperson: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Date</Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                value={formData.date}
                onChange={async (e) => {
                  const date = e.target.value;
                  setFormData({ ...formData, date });
                  const conflict = await checkDateConflict(date);
                  setDateConflict(conflict);
                }}
                required
              />
              {dateConflict && <span className="text-danger">Date is already booked</span>}
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Start Time</Form.Label>
            <Col sm="10">
              <Form.Control
                type="time"
                value={formData.starttime}
                onChange={(e) => setFormData({ ...formData, starttime: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">End Time</Form.Label>
            <Col sm="10">
              <Form.Control
                type="time"
                value={formData.endtime}
                onChange={(e) => setFormData({ ...formData, endtime: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Devotee Name</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter devotee name"
                value={formData.devotename}
                onChange={(e) => setFormData({ ...formData, devotename: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Phone</Form.Label>
            <Col sm="10">
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Items</Form.Label>
            {formData.items.map((item, index) => renderItemsField(item, index))}
            <Button className='placement' variant="secondary" onClick={handleAddItem}>Add Item</Button>
          </Form.Group>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Add Thirukalayanam'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddEvent;
