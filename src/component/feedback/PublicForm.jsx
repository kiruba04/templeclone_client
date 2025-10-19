import React, { useState, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './PublicForm.css';
import { useTranslation } from 'react-i18next';

const submitFeedback = async (formData) => {
  try {
    const response = await fetch('https://venkatesaperumal-backend.onrender.com/api/feedback/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
const PublicForm = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    message: '',
    issueDate: new Date().toISOString().split('T')[0], // default to today
    issuePlace: '',
    timestamp: new Date().toLocaleDateString()
  });

  const [verified, setVerified] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const [loading, setLoading] = useState(false); // <-- new state for button disable/loading
  const [alertMessage, setAlertMessage] = useState(""); // <-- dynamic alert message

  // Keep timestamp updated
  useEffect(() => {
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        timestamp: new Date().toLocaleDateString()
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);

    setLoading(true); 
    setAlertMessage("Sending feedback..."); 
    setShowAlert(true);

    try {
      await submitFeedback(formData);

      setAlertMessage("✅ Feedback submitted successfully!");
      setTimeout(() => setShowAlert(false), 9000);

      // Reset form
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        message: '',
        issueDate: new Date().toISOString().split('T')[0],
        issuePlace: '',
        timestamp: new Date().toLocaleDateString()
      });
      setVerified(false);
    } catch (error) {
      console.error('Submission error:', error);
      setAlertMessage("❌ An error occurred while submitting the form.");
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setLoading(false); 
    }
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    if (i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <div>
      <div className="fb-form">
        <div className="text-center mb-2">
          <h1 className="display-4 feedback">{t('feedbackform')}</h1>
        </div>
        <div className="container feedback-container">
          <div className="row bg-light text-dark p-4 rounded shadow">
            <div className="col-md-6 mb-4 mb-md-0 d-flex align-items-center">
              <div>
                <h2 className="h1 fw-bold">{t('We are happy to serve you')}</h2>
                <p className="lead">{t('Please use the form below for enquiries')}</p>
                <p className="text-muted">
                  {t('Current Date')} <strong>{formData.timestamp}</strong>
                </p>
              </div>
            </div>

            <div className="col-md-6 form-align">

              {/* Bootstrap Alert */}
              {showAlert && (
                <div className={`alert ${loading ? "alert-info" : "alert-success"} alert-dismissible fade show`} role="alert">
                  {alertMessage}
                  {!loading && (
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setShowAlert(false)}
                    ></button>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label fw-semibold">
                    {t('Full Name')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email & Phone */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold">
                      {t('Email Address')}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label fw-semibold">
                      {t('Phone Number')}
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Issue Date & Place */}
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="issueDate" className="form-label fw-semibold">
                      {t('Issue Date')}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="issueDate"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label htmlFor="issuePlace" className="form-label fw-semibold">
                      {t('Issue Place')}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="issuePlace"
                      name="issuePlace"
                      value={formData.issuePlace}
                      onChange={handleChange}
                      placeholder="Enter the place of issue"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label fw-semibold">
                    {t('Message')}
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your feedback here..."
                    rows="4"
                    required
                  ></textarea>
                </div>

                {/* Captcha */}
                <div className="mb-3">
                  <ReCAPTCHA
                    sitekey="6Ldrz6MrAAAAAGgf5sKt9sQd_Bains8cysha_2MR"
                    onChange={() => setVerified(true)}
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-info w-100" 
                  disabled={!verified || loading} // disable while loading
                >
                  {loading ? t("Submitting...") : t("Submit Feedback")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicForm;