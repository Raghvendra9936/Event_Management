import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
        navigate('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };
    logout();
  }, [navigate]);

  return <h2>Logging out...</h2>;
};

export default Logout;
