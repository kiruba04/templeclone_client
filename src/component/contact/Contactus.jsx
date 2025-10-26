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
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Sri%20Nanaammadevi%20Vijayanarayana%20Choedralu%20Devasthanam+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
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
