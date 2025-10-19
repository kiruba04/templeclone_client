import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import "./inventory.css"

const Addinventory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [modalData, setModalData] = useState({ type: '', show: false });

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get('https://venkatesaperumal-backend.onrender.com/api/categories'); // Replace with your API URL
    setCategories(response.data);
  };

  const fetchSubCategories = async (categoryId) => {
    const response = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/subcategories/category/${categoryId}`);
    setSubCategories(response.data);
  };

  const fetchItems = async (subCategoryId) => {
    const response = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/items/subcategory/${subCategoryId}`);
    setItems(response.data);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    fetchSubCategories(category._id);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    fetchItems(subCategory._id);
  };

  const handleModalShow = (type) => {
    setModalData({ type, show: true });
  };

  const handleModalClose = () => {
    setModalData({ type: '', show: false });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (modalData.type === 'category') {
        await axios.post('https://venkatesaperumal-backend.onrender.com/api/categories', { categoryName: formData.get('name') });
      } else if (modalData.type === 'subcategory') {
        await axios.post('https://venkatesaperumal-backend.onrender.com/api/subcategories', {
          categoryId: selectedCategory._id,
          subCategoryName: formData.get('name'),
        });
      } else if (modalData.type === 'item') {
        await axios.post('https://venkatesaperumal-backend.onrender.com/api/items', {
          subCategoryId: selectedSubCategory._id,
          itemName: formData.get('name'),
        });
      }
      fetchCategories();
      handleModalClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Left Panel */}
        <Col md={7}>
          <h3>Categories</h3>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category._id}
                action
                onClick={() => handleCategoryClick(category)}
                active={selectedCategory?._id === category._id}
              >
                {category.categoryName}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {selectedCategory && (
            <>
              <h4 className="mt-4">Subcategories</h4>
              <ListGroup>
                {subCategories.map((subCategory) => (
                  <ListGroup.Item
                    key={subCategory._id}
                    action
                    onClick={() => handleSubCategoryClick(subCategory)}
                    active={selectedSubCategory?._id === subCategory._id}
                  >
                    {subCategory.subCategoryName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}

          {selectedSubCategory && (
            <>
              <h4 className="mt-4">Items</h4>
              <ListGroup>
                {items.map((item) => (
                  <ListGroup.Item key={item._id}>{item.itemName}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Col>

        {/* Right Panel */}
        <Col md={5}>
          <h3>Actions</h3>
          <Button className="mb-3 me-2" variant='outline-success' onClick={() => handleModalShow('category')}>
            Add Category
          </Button>
          {selectedCategory && (
            <Button className="mb-3 me-2" variant='outline-success' onClick={() => handleModalShow('subcategory')}>
              Add Subcategory
            </Button>
          )}
          {selectedSubCategory && (
            <Button className="mb-3 me-2" variant='outline-success' onClick={() => handleModalShow('item')}>
              Add Item
            </Button>
          )}
        </Col>
      </Row>

      {/* Modal for Adding */}
      <Modal show={modalData.show} onHide={handleModalClose}>
        <Modal.Header closeButton >
        <Modal.Title>
  Add {modalData.type === 'category'
    ? 'Category'
    : modalData.type === 'subcategory'
    ? `Subcategory on ${selectedCategory?.categoryName || ''}`
    : `Item on ${selectedSubCategory?.subCategoryName || ''}`}
</Modal.Title>

        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>
                {modalData.type === 'category'
                  ? 'Category Name'
                  : modalData.type === 'subcategory'
                  ? 'Subcategory Name'
                  : 'Item Name'}
              </Form.Label>
              <Form.Control type="text" name="name" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Addinventory;
