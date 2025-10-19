import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import './FeedbackCard.css';

const FeedbackCard = ({ feedback }) => {
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState('');
  const [hasResponse, setHasResponse] = useState(false);
  const [existingResponse, setExistingResponse] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const date = new Date(feedback.timestamp).toLocaleDateString();

  useEffect(() => {
    const checkResponse = async () => {
      try {
        const res = await axios.get('https://templeclone-backend.onrender.com/api/response/all');
        const found = res.data.find((r) => r.feedbackId._id === feedback._id);
        if (found) {
          setHasResponse(true);
          setExistingResponse(found);
        }
      } catch (error) {
        console.error('Error checking response:', error);
      }
    };
    checkResponse();
  }, [feedback._id]);

  const handleSendResponse = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const trusteeId = user?.id || user?._id;
      if (!trusteeId) {
        alert('Trustee ID not found. Please log in again.');
        return;
      }

      const payload = {
        trusteeId,
        feedbackId: feedback._id,
        response: response,
      };

      const res = await axios.post(
        'https://templeclone-backend.onrender.com/api/response/send',
        payload
      );

      // Show success alert
      setHasResponse(true);
      setExistingResponse(res.data.response);
      setShowSuccessAlert(true);

      // Close modal
      setShowModal(false);
      setResponse('');

      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending response:', error);
      alert('Failed to send response. Please try again.');
    }
  };

  return (
    <>
      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert variant="success" className="mt-2">
          Response sent successfully!
        </Alert>
      )}

      <div className="feedback-card">
        <div className="feedback-header">
          <h5 className="feedback-name">{feedback.fullname}</h5>
          <p className="feedback-date">{date}</p>
        </div>
        <p className="feedback-email"><strong>Email:</strong> {feedback.email || 'N/A'}</p>
        <p className="feedback-phone"><strong>Phone:</strong> {feedback.phone || 'N/A'}</p>
        <p className="feedback-issue-date"><strong>Issue Date:</strong> {new Date(feedback.issueDate).toLocaleDateString()}</p>
        <p className="feedback-issue-place"><strong>Issue Place:</strong> {feedback.issuePlace || 'N/A'}</p>
        <div className="feedback-message">
          <p>{feedback.message}</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
    {feedback.email ? (
    <>
      <button
        className="respond-btn"
        onClick={() => setShowModal(true)}
        disabled={hasResponse || !JSON.parse(localStorage.getItem('user'))?.isedit}
      >
        {hasResponse ? 'Responded' : 'Respond'}
      </button>

      {hasResponse && (
        <button
          className="view-btn"
          onClick={() => setShowViewModal(true)}
        >
          View Response
        </button>
      )}
    </>
  ) : (
    <button className="respond-btn" disabled>
      Unrespond
    </button>
  )}
</div>

      </div>

      {/* Send Response Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Response to {feedback.fullname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Send Email to {feedback.email}</p>
          <Form>
            <Form.Group>
              <Form.Label>Response Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your response here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="outline-success" onClick={handleSendResponse}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Response Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Response to {feedback.fullname}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {existingResponse ? (
            <>
              <p><strong>Message:</strong></p>
              <p>{existingResponse.response}</p>
              <hr />
              <p><strong>Sent By:</strong> {existingResponse.trusteeId?.username}</p>
              <p><strong>Sent At:</strong> {new Date(existingResponse.sentAt).toLocaleString()}</p>
            </>
          ) : (
            <p>No response found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FeedbackCard;
