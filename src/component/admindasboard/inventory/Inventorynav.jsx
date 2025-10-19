import React from 'react';
import { Nav } from 'react-bootstrap';
import './Inventorynav.css'; // Optional: Custom CSS for styling

const Inventorynav = ({ setInventoryView, inventoryView }) => {
  return (
    <Nav className="flex-row gap-4">
      <Nav.Link
        active={inventoryView === 'addInventory'}
        onClick={() => setInventoryView('addInventory')}
        className={`customnav ${inventoryView === 'addInventory' ? 'activeinventory' : ''}`}
      >
        Add Inventory
      </Nav.Link>
      <Nav.Link
        active={inventoryView === 'addItem'}
        onClick={() => setInventoryView('addItem')}
        className={`customnav ${inventoryView === 'addItem' ? 'activeinventory' : ''}`}
      >
        Add Item
      </Nav.Link>
      <Nav.Link
        active={inventoryView === 'itemHistory'}
        onClick={() => setInventoryView('itemHistory')}
        className={`customnav ${inventoryView === 'itemHistory' ? 'activeinventory' : ''}`}
      >
        Item History
      </Nav.Link>
      <Nav.Link
        active={inventoryView === 'itemsToBeReturned'}
        onClick={() => setInventoryView('itemsToBeReturned')}
        className={`customnav ${inventoryView === 'itemsToBeReturned' ? 'activeinventory' : ''}`}
      >
        Items to be Returned
      </Nav.Link>
    </Nav>
  );
};

export default Inventorynav;
