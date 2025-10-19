import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Inventorynav from './Inventorynav';
import AddInventory from './Addinventory';

const Inventorymain = () => {
  const [inventoryView, setInventoryView] = useState(() => localStorage.getItem('inventoryView') || 'addInventory');

  useEffect(() => {
    localStorage.setItem('inventoryView', inventoryView);
  }, [inventoryView]);

  return (
    <Container fluid >
      <Row className='flex-column'>
        <Col md={12} className="p-0">
          <Inventorynav setInventoryView={setInventoryView} inventoryView={inventoryView} />
        </Col>
        <Col md={12} className="p-4">
            {inventoryView === 'addInventory' && <AddInventory />}
        </Col>
      </Row>
    </Container>
  );
};

export default Inventorymain;
