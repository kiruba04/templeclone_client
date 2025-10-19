import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Alert, Dropdown, Modal } from 'react-bootstrap';
import axios from 'axios';
import './main.css';

const Uthchavam = () => {
  const [uthchavams, setUthchavams] = useState([]);
  const [newUthchavam, setNewUthchavam] = useState({
    poojaname: '',
    startdate: '',
    enddate: '',
    imageurls: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [selectedUthchavam, setSelectedUthchavam] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get('https://templeclone-backend.onrender.com/api/uthchavams')
      .then((response) => setUthchavams(response.data))
      .catch((error) => console.error('Error fetching uthchavams:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUthchavam({ ...newUthchavam, [name]: value });
  };

  const handleViewUthchavam = (id) => {
    const uthchavam = uthchavams.find((u) => u._id === id);
    setSelectedUthchavam(uthchavam);

    setIsEditing(false);
    setIsCreating(false);
    setShowModal(true);
  };

  const handleUpdateUthchavam = async () => {
    try {
      await axios.put(`https://templeclone-backend.onrender.com/api/uthchavams/${selectedUthchavam._id}`, selectedUthchavam);
      setSuccess('Uthchavam updated successfully!');
      
      const response = await axios.get('https://templeclone-backend.onrender.com/api/uthchavams');
      setUthchavams(response.data);

      setTimeout(() => {
        setSuccess('');
        setSelectedUthchavam(null);
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setError('Error updating Uthchavam');
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedImageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'zpbashqc'); // Replace with your Cloudinary preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dsgdnskfj/image/upload', formData);
        uploadedImageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
    
    setNewUthchavam((prevData) => ({
      ...prevData,
      imageurls: [...prevData.imageurls, ...uploadedImageUrls]
    }));
  };

  const handleImageUploadOnModel = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedImageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'zpbashqc'); // Replace with your Cloudinary preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dsgdnskfj/image/upload', formData);
        uploadedImageUrls.push(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image', error);
      }
    }
    setSelectedUthchavam((prevData) => ({
      ...prevData,
      imageurls: [...prevData.imageurls, ...uploadedImageUrls]
    }));
  };


  const handleDeleteImage = (index) => {
    const updatedImageUrls = [...selectedUthchavam.imageurls];
    updatedImageUrls.splice(index, 1);
    setSelectedUthchavam({ ...selectedUthchavam, imageurls: updatedImageUrls });
  };

  const handleDeleteImageonform = (index) => {
    const updatedImageUrls = [...newUthchavam.imageurls];
    updatedImageUrls.splice(index, 1);
    setNewUthchavam({ ...newUthchavam, imageurls: updatedImageUrls });
  }

  const handleCreateUthchavam = async () => {
    try {
      await axios.post('https://templeclone-backend.onrender.com/api/uthchavams', newUthchavam);
      const response = await axios.get('https://templeclone-backend.onrender.com/api/uthchavams');
      setUthchavams(response.data);
      setNewUthchavam({
        poojaname: '',
        startdate: '',
        enddate: '',
        imageurls: []
      });
      setError('');
      setIsCreating(false);
    } catch (error) {
      console.error(error);
      setError('Error creating Uthchavam');
    }
  };

  const handleSend = async (id) => {
    try {
      await axios.post('https://templeclone-backend.onrender.com/api/send-images', {
        uthchavamId: id,
        groupType: selectedGroups[id] || 'devotee'
      });
      setSuccess('Message sent successfully!');

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error sending messages:', error);
      setError('Failed to send messages');
    }
  };

  const handleDeleteUthchavam = async (id) => {
    try {
      await axios.delete(`https://templeclone-backend.onrender.com/api/uthchavams/${id}`);
      setUthchavams(uthchavams.filter((uthchavam) => uthchavam._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGroupChange = (id, group) => {
    setSelectedGroups({ ...selectedGroups, [id]: group });
  };

  return (
    <div>
      <h1 className="heading">Utchavam Management</h1>

      {/* Success Alert */}
      {success && (
        <Alert variant="success" onClose={() => setSuccess('')} dismissible>
          {success}
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uthchavams.map((uthchavam) => (
            <tr key={uthchavam._id}>
              <td>{uthchavam.poojaname}</td>
              <td>{new Date(uthchavam.startdate).toLocaleDateString()}</td>
              <td>{new Date(uthchavam.enddate).toLocaleDateString()}</td>
              <td>
                <div className="d-flex flex-row mr-2">
                  <Dropdown className="threebtn">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {selectedGroups[uthchavam._id]?.charAt(0).toUpperCase() +
                        selectedGroups[uthchavam._id]?.slice(1) || 'Devotee'}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleGroupChange(uthchavam._id, 'devotee')}>
                        Devotee
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGroupChange(uthchavam._id, 'volunteer')}>
                        Volunteer
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGroupChange(uthchavam._id, 'special')}>
                        Special Devotee
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    variant="primary"
                    onClick={() => handleSend(uthchavam._id)}
                    className="threebtn"
                  >
                    Send
                  </Button>
                </div>
              </td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleViewUthchavam(uthchavam._id)}
                  className="threebtn"
                >
                  View
                </Button>
                <Button
                  variant="warning"
                  onClick={() => {
                    setSelectedUthchavam(uthchavam);
                    setIsEditing(true);
                    setIsCreating(false);
                    
                    setShowModal(true);
                  }}
                  className="threebtn"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUthchavam(uthchavam._id)}
                  className="threebtn"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="outline-success" onClick={() => setIsCreating(!isCreating)}>
        {isCreating ? 'Cancel' : 'Add Festival'}
      </Button>

      {isCreating && (
        <Form className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Utchavam Name</Form.Label>
            <Form.Control
              type="text"
              name="poojaname"
              value={newUthchavam.poojaname}
              onChange={handleInputChange}
              placeholder="Enter Pooja Name"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startdate"
              value={newUthchavam.startdate}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="enddate"
              value={newUthchavam.enddate}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control type="file" multiple onChange={handleImageUpload} />
          </Form.Group>

          {newUthchavam.imageurls.length > 0 && (
            <div className="image-preview">
              {newUthchavam.imageurls.map((url, index) => (
                <div key={index} className="image-container">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                  <img src={url} alt={`Upload Preview ${index + 1}`} />
                  </a>
                  <Button variant="danger" onClick={() => handleDeleteImageonform(index)}>
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button variant="primary" onClick={handleCreateUthchavam}>
            Create
          </Button>
        </Form>
      )}

      {/* Modal for Viewing and Updating */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Update Uthchavam' : 'View Uthchavam'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Utchavam Name</Form.Label>
              <Form.Control
                type="text"
                name="poojaname"
                value={selectedUthchavam?.poojaname || ''}
                onChange={(e) =>
                  setSelectedUthchavam({ ...selectedUthchavam, poojaname: e.target.value })
                }
                readOnly={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startdate"
                value={ selectedUthchavam?.startdate
                  ? new Date(selectedUthchavam.startdate).toISOString().split('T')[0]
                  : ''}
                onChange={(e) =>
                  setSelectedUthchavam({ ...selectedUthchavam, startdate: e.target.value })
                }
                readOnly={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="enddate"
                value={ selectedUthchavam?.enddate
                  ? new Date(selectedUthchavam.enddate).toISOString().split('T')[0]
                  : ''}
                onChange={(e) =>
                  setSelectedUthchavam({ ...selectedUthchavam, enddate: e.target.value })
                }
                readOnly={!isEditing}
              />
            </Form.Group>

            {isEditing && (
              <Form.Group className="mb-3">
                <Form.Label>Upload New Image</Form.Label>
                <Form.Control type="file" onChange={handleImageUploadOnModel} />
              </Form.Group>
            )}

            {selectedUthchavam?.imageurls?.length > 0 && (
                <div className="image-preview">
                  {selectedUthchavam.imageurls.map((url, index) => (
                  <div key={index} className="model-image-container">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <img src={url} alt={`Upload Preview ${index + 1}`} className='model-image-container'/>
                    </a>
                    {isEditing && (
                      <Button variant="danger" onClick={() => handleDeleteImage(index)}>
                        Delete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isEditing && (
            <Button variant="primary" onClick={handleUpdateUthchavam}>
              Save Changes
            </Button>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Uthchavam;