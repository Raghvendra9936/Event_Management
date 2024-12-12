import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const VendorDashboard = () => {
  return (
    <div>
      <h2>Vendor Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="add-product">Add Product</Link></li>
          <li><Link to="view-products">View Products</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="add-product" element={<div>Add Product Component</div>} />
        <Route path="view-products" element={<div>View Products Component</div>} />
      </Routes>
    </div>
  );
};

export default VendorDashboard;
