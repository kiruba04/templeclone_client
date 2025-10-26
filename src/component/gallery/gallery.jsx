import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './gallery.css';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { t, i18n } = useTranslation();

  // Fetch images
  useEffect(() => {
    axios
      .get('https://templeclone-backend.onrender.com/api/images')
      .then(response => {
        if (response.data.success) {
          setImages(response.data.images);
        }
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  // Handle language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  // Handle image click
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  // Close modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="container containerbanner">
      <div className="row">
        <h4 className="headcontent contacttitle">{t('Gallery')}</h4>

        {images.map((image, index) => (
          <div
            key={image._id}
            className="col-md-2 col-sm-4 banner mb-3"
            onClick={() => handleImageClick(image.url)}
            style={{ cursor: 'pointer' }}
          >
            {/* Lazy Loading Image */}
            <img
              src={image.url}
              alt={`Image-${index}`}
              className="img-fluid gallery-thumb"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      <Modal
  show={showModal}
  onHide={handleClose}
  centered
  size="sm"
>
  <Modal.Body className="text-center p-0">
    {selectedImage && (
      <img
        src={selectedImage}
        alt="Full View"
        className="w-100 h-auto"
      />
    )}
  </Modal.Body>
</Modal>

    </div>
  );
};

export default Gallery;
