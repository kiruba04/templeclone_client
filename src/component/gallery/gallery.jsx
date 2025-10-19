import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './gallery.css'
import { useTranslation } from 'react-i18next'; 
const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('https://templeclone-backend.onrender.com/api/images') // Ensure URL is correct
      .then(response => {
        if (response.data.success) {
          setImages(response.data.images); // Set the images from response
        }
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);
  const { t, i18n } = useTranslation(); // useTranslation hook
   
  useEffect(() => {
      // Get the saved language from localStorage
      const savedLanguage = localStorage.getItem('language') || 'en'; // Default to 'en' if not set
      if (i18n.language !== savedLanguage) {
        // Only change language if it's different from the current one
        i18n.changeLanguage(savedLanguage);
      }
    }, [i18n]); // Run only once when the component mounts

  return (
    <div className="container containerbanner">
      <div className="row">
      <h4 className='headcontent'>{t('Gallery')}</h4>
        <div className='line1'></div>
        {images.map((image, index) => (
          <div key={image._id} className="col-md-2 col-sm-2 banner">
            <img src={image.url} alt={`Image-${index}`} className="img-fluid" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
