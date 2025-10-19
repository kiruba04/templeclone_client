import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("https://templeclone-backend.onrender.com/api/images");
      setImages(response.data.images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return;
      const file = selectedImage;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'zpbashqc'); // Replace with your Cloudinary preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dsgdnskfj/image/upload', formData);
        await axios.post('https://templeclone-backend.onrender.com/api/images', { url: response.data.secure_url });
        fetchImages(); // Refresh images
        setPreview(null);
        setSelectedImage(null);
      } catch (error) {
        console.error('Error uploading image', error);
      }
    
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://templeclone-backend.onrender.com/api/images/${id}`);
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center heading">Gallery</h2>
      <div className="text-center mb-3">
        {preview ? (
          <>
            <img src={preview} alt="Preview" style={{ width: "200px", marginBottom: "10px", marginRight:"20px" }} />
            <Button variant="success" onClick={handleUploadImage}>
            <i class="bi bi-cloud-arrow-up-fill"></i>Upload
            </Button>
          </>
        ) : (
          <Form.Group>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Group>
        )}
      </div>
      <Row>
        {images.map((image) => (
          <Col key={image._id} md={2} className="mb-2">
            <Card>
              <Card.Img variant="top" src={image.url} alt="Gallery Item" />
              <Card.Body className="text-center">
                <Button variant="danger" onClick={() => handleDelete(image._id)} >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Gallery;
