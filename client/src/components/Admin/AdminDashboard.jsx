import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="add-membership">Add Membership</Link></li>
          <li><Link to="manage-vendors">Manage Vendors</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="add-membership" element={<div>Add Membership Component</div>} />
        <Route path="manage-vendors" element={<div>Manage Vendors Component</div>} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
