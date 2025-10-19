import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import './main.css';

const AddEvent = () => {
  const [poojas, setPoojas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    poojaname: '',
    poojaname_ta: '', // Added poojaname_ta for Tamil Pooja Name
    poojacharges: '',
    noofperson: '',
    token: '',
    items: [],
    date: '',
    starttime: '',
    endtime: '',
    imageurls: [] // Updated for multiple images
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingPoojaId, setEditingPoojaId] = useState(null);

  useEffect(() => {
    fetchPoojas();
  }, []);

  const fetchPoojas = async () => {
    try {
      const response = await axios.get('https://venkatesaperumal-backend.onrender.com/api/specialPoojas', {
        withCredentials: true
      });
      setPoojas(response.data);
    } catch (error) {
      console.error('Error fetching poojas', error);
    }
  };

  const handleAddPooja = async () => {
    try {
      const response = await axios.post('https://venkatesaperumal-backend.onrender.com/api/specialPoojas', formData, {
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
      const response = await axios.put(`https://venkatesaperumal-backend.onrender.com/api/specialPoojas/${editingPoojaId}`, formData, {
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
      await axios.delete(`https://venkatesaperumal-backend.onrender.com/api/specialPoojas/${id}`, {
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
      poojaname_ta: pooja.poojaname_ta || '', // Updated for Tamil Pooja Name
      poojacharges: pooja.poojacharges,
      noofperson: pooja.noofperson,
      token: pooja.token,
      items: pooja.items,
      date: pooja.date.split('T')[0],
      starttime: pooja.starttime,
      endtime: pooja.endtime,
      imageurls: pooja.imageurls || [] // Updated for multiple images
    });
    setIsEditing(true);
    setEditingPoojaId(pooja._id);
    setFormVisible(true);
  };

  const resetForm = () => {
    setFormData({
      poojaname: '',
      poojaname_ta: '', // Reset poojaname_ta
      poojacharges: '',
      noofperson: '',
      token: '',
      items: [],
      date: '',
      starttime: '',
      endtime: '',
      imageurls: [] // Updated for multiple images
    });
    setIsEditing(false);
    setEditingPoojaId(null);
    setFormVisible(false);
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

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedImageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'zpbashqc');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dsgdnskfj/image/upload', formData);
        uploadedImageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      imageurls: [...prevData.imageurls, ...uploadedImageUrls]
    }));
  };

  return (
    <div>
      <h1 className='heading'>Special Pooja Management</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Special Pooja Name</th>
            <th>Pooja Charges</th>
            <th>No of Person per Token</th>
            <th>Token</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {poojas.map((pooja) => (
            <tr key={pooja._id}>
              <td>{pooja.poojaname}</td>
              <td>{pooja.poojacharges}</td>
              <td>{pooja.noofperson}</td>
              <td>{pooja.token}</td>
              <td>{new Date(pooja.date).toLocaleDateString()}</td>
              <td>{pooja.starttime}</td>
              <td>{pooja.endtime}</td>
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
            <Form.Label column sm="2">Pooja Name (Tamil)</Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Enter pooja name in Tamil"
                value={formData.poojaname_ta}
                onChange={(e) => setFormData({ ...formData, poojaname_ta: e.target.value })}
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
            <Form.Label column sm="2">No of Person per Token</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter No of person per Token"
                value={formData.noofperson}
                onChange={(e) => setFormData({ ...formData, noofperson: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">No of Token</Form.Label>
            <Col sm="10">
              <Form.Control
                type="number"
                placeholder="Enter No of Token"
                value={formData.token}
                onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Items</Form.Label>
            <Col sm="10">
              {formData.items.map((item, index) => (
                <div key={index} className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Enter item"
                    value={item}
                    onChange={(e) => handleItemChange(e, index)}
                    required
                  />
                  <Button variant="danger" onClick={() => handleRemoveItem(index)} className="mt-1">
                    Remove Item
                  </Button>
                </div>
              ))}
              <Button variant="primary" onClick={handleAddItem}>Add Item</Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">Date</Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
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
            <Form.Label column sm="2">Upload Images</Form.Label>
            <Col sm="10">
              <Form.Control
                type="file"
                onChange={handleImageUpload}
                multiple // Allows multiple image selection
              />
              <div className="mt-2">
                {formData.imageurls.map((url, index) => (
                  <img key={index} src={url} alt={`uploaded img ${index}`} />
                ))}
              </div>
            </Col>
          </Form.Group>
          <Button type="submit">{isEditing ? 'Update' : 'Add'} Pooja</Button>
        </Form>
      )}
    </div>
  );
};

export default AddEvent;
