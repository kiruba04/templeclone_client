import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, Col, ListGroup, Alert } from "react-bootstrap";

const NewsManager = () => {
  const [news, setNews] = useState({
    newsheadlines_en: "",
    newsheadlines_ta: "",
  });
  const [newsList, setNewsList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

  // Fetch news items from the backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://templeclone-backend.onrender.com/api/news");
        setNewsList(response.data);
      } catch (error) {
        setAlert({ show: true, variant: "danger", message: "Error fetching news!" });
      }
    };
    fetchNews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://templeclone-backend.onrender.com/api/news/${editId}`, news);
        setAlert({ show: true, variant: "success", message: "News updated successfully!" });
      } else {
        await axios.post("https://templeclone-backend.onrender.com/api/news", news);
        setAlert({ show: true, variant: "success", message: "News added successfully!" });
      }
      setNews({ newsheadlines_en: "", newsheadlines_ta: "" });
      setEditId(null);
      const response = await axios.get("https://templeclone-backend.onrender.com/api/news");
      setNewsList(response.data);
    } catch (error) {
      setAlert({ show: true, variant: "danger", message: "Error submitting news!" });
    }
  };

  const handleEdit = (newsItem) => {
    setNews({
      newsheadlines_en: newsItem.newsheadlines_en,
      newsheadlines_ta: newsItem.newsheadlines_ta,
    });
    setEditId(newsItem._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://templeclone-backend.onrender.com/api/news/${id}`);
      setAlert({ show: true, variant: "success", message: "News deleted successfully!" });
      const response = await axios.get("https://templeclone-backend.onrender.com/api/news");
      setNewsList(response.data);
    } catch (error) {
      setAlert({ show: true, variant: "danger", message: "Error deleting news!" });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <div className="container mt-4">
      <h1 className="heading">{editId ? "Update News" : "Add News"}</h1>

      {/* Alert Section */}
      {alert.show && (
        <Alert variant={alert.variant} onClose={handleCloseAlert} dismissible>
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="newsheadlines_en">
              <Form.Label className="heading">News Headlines (English)</Form.Label>
              <Form.Control
                type="text"
                name="newsheadlines_en"
                value={news.newsheadlines_en}
                placeholder="Enter news headlines in English"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="newsheadlines_ta">
              <Form.Label className="heading">News Headlines (Tamil)</Form.Label>
              <Form.Control
                type="text"
                name="newsheadlines_ta"
                placeholder="Enter news headlines in Tamil"
                value={news.newsheadlines_ta}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {editId ? "Update News" : "Add News"}
        </Button>
      </Form>

      <h1 className="mt-4 heading">News List</h1>
      <ListGroup>
        {newsList.map((newsItem) => (
          <ListGroup.Item
            key={newsItem._id}
            className="d-flex justify-content-between align-items-center mt-3 news-list"
          >
            <div className="news-item">
              <strong>English:</strong> {newsItem.newsheadlines_en} <br />
              <strong>Tamil:</strong> {newsItem.newsheadlines_ta}
            </div>
            <div>
              <Button
                variant="secondary"
                
                className="me-2"
                onClick={() => handleEdit(newsItem)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
            
                onClick={() => handleDelete(newsItem._id)}
              >
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default NewsManager;
