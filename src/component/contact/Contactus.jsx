import React from 'react';
import './ContactUs.css'; // Optional: Include any custom styling

const ContactUs = () => {
  return (
    <div className="container contact-us">
      <h2 className="text-center contacttitle">Contact Us</h2>
      <div className="row">
        {/* Contact Details */}
        <div className="col-lg-6 col-12">
          <div className="contact-details">
            <ul className="list-unstyled">
                <li><strong>Donations and Contributions:</strong> Mr. Sundararajan – 9841731713</li>
                <li><strong>Pooja and Arrangements:</strong> Mr. K. Ramachandran – 7806941130</li>
                <br></br>
                <li><strong>Marriage Hall Booking:</strong></li>
                <ul>
                  <li>Mr. Ramesh – 9994477717</li>
                  <li>Mr. M. Balakrishnan – 9486616216</li>
                </ul>
              </ul>
            <br></br>
            
          </div>
        </div>

        {/* Map */}
        <div className="col-lg-6 col-12">
          <div className="map-container">
            <h3 className='mapheader'>Find Us on the Map:</h3>
            <iframe
              title="Temple Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.161313646476!2d77.16382871440668!3d11.294378292076524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8e25be1afb1c3%3A0x154afd8e679d3192!2sSri%20Venkatesa%20Perumal%20Temple!5e0!3m2!1sen!2sin!4v1695147851776!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <footer className="footer">
      <p className='notextindent'>
        © 2024 developed and owned by{' '}
        <a 
          href="https://sriethirajatechnologies.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          Sri Ethiraja Technologies
        </a>
      </p>
    </footer>
    </div>
  );
};

export default ContactUs;
