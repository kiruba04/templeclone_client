import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import "./inventory.css";

const Addinventory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [modalData, setModalData] = useState({ type: '', show: false });
  const [alertData, setAlertData] = useState({ show: false, message: '', variant: 'info' });

  // ===============================
  // FETCH DATA FUNCTIONS
  // ===============================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get('https://venkatesaperumal-backend.onrender.com/api/categories');
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

  // ===============================
  // CLICK HANDLERS
  // ===============================
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    fetchSubCategories(category._id);
    setItems([]);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    fetchItems(subCategory._id);
  };

  // ===============================
  // MODAL HANDLERS
  // ===============================
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
        const response = await axios.get('https://venkatesaperumal-backend.onrender.com/api/categories');
        setCategories(response.data);
      } else if (modalData.type === 'subcategory') {
        await axios.post('https://venkatesaperumal-backend.onrender.com/api/subcategories', {
          categoryId: selectedCategory._id,
          subCategoryName: formData.get('name'),
        });
        const response = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/subcategories/category/${selectedCategory._id}`);
        setSubCategories(response.data);
      } else if (modalData.type === 'item') {
        await axios.post('https://venkatesaperumal-backend.onrender.com/api/items', {
          subCategoryId: selectedSubCategory._id,
          itemName: formData.get('name'),
        });
        const response = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/items/subcategory/${selectedSubCategory._id}`);
        setItems(response.data);
      }
      fetchCategories();
      handleModalClose();
      showAlert("✅ Added successfully!", "success");
    } catch (err) {
      console.error(err);
      showAlert("❌ Error adding data.", "danger");
    }
  };

  // ===============================
  // ALERT HANDLER
  // ===============================
  const showAlert = (message, variant = "info") => {
    setAlertData({ show: true, message, variant });
    setTimeout(() => setAlertData({ show: false, message: '', variant: 'info' }), 4000);
  };

  // ===============================
  // DELETE HANDLERS WITH DEPENDENCY CHECKS
  // ===============================
  const handleDelete = async (type, id) => {
    try {
      if (type === 'category') {
        const { data: subCats } = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/subcategories/category/${id}`);
        if (subCats.length > 0) {
          showAlert("❌ Cannot delete category with existing subcategories.", "warning");
          return;
        }
        await axios.delete(`https://venkatesaperumal-backend.onrender.com/api/categories/${id}`);
        showAlert("✅ Category deleted successfully.", "success");
        fetchCategories();
        setSelectedCategory(null);
        setSubCategories([]);
        setItems([]);
      }

      else if (type === 'subcategory') {
        const { data: itemList } = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/items/subcategory/${id}`);
        if (itemList.length > 0) {
          showAlert("❌ Cannot delete subcategory with existing items.", "warning");
          return;
        }
        await axios.delete(`https://venkatesaperumal-backend.onrender.com/api/subcategories/${id}`);
        showAlert("✅ Subcategory deleted successfully.", "success");
        fetchSubCategories(selectedCategory._id);
        setSelectedSubCategory(null);
        setItems([]);
      }

      else if (type === 'item') {
        const { data: inventoryList } = await axios.get(`https://venkatesaperumal-backend.onrender.com/api/inventory/item/${id}`);
        if (inventoryList.length > 0) {
          showAlert("❌ Cannot delete item — inventory exists for this item.", "warning");
          return;
        }
        await axios.delete(`https://venkatesaperumal-backend.onrender.com/api/items/${id}`);
        showAlert("✅ Item deleted successfully.", "success");
        fetchItems(selectedSubCategory._id);
      }

    } catch (err) {
      console.error(err);
      showAlert("❌ Error deleting record.", "danger");
    }
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <Container fluid>
      {/* ALERT SECTION */}
      {alertData.show && (
        <Alert
          variant={alertData.variant}
          dismissible
          onClose={() => setAlertData({ ...alertData, show: false })}
          className="mt-3"
        >
          {alertData.message}
        </Alert>
      )}

      <Row>
        {/* LEFT PANEL */}
        <Col md={7}>
          <h3>Categories</h3>
          <ListGroup>
            {categories.map((category) => (
              <ListGroup.Item
                key={category._id}
                action
                onClick={() => handleCategoryClick(category)}
                active={selectedCategory?._id === category._id}
                className="d-flex justify-content-between align-items-center"
              >
                {category.categoryName}
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete('category', category._id);
                  }}
                >
                  Delete
                </Button>
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
                    className="d-flex justify-content-between align-items-center"
                  >
                    {subCategory.subCategoryName}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete('subcategory', subCategory._id);
                      }}
                    >
                      Delete
                    </Button>
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
                  <ListGroup.Item
                    key={item._id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {item.itemName}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete('item', item._id)}
                    >
                      Delete
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Col>

        {/* RIGHT PANEL */}
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

      {/* MODAL */}
      <Modal show={modalData.show} onHide={handleModalClose}>
        <Modal.Header closeButton>
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
