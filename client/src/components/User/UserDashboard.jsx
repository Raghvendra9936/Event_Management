import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <h2>User Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="view-orders">View Orders</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="view-orders" element={<div>View Orders Component</div>} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
