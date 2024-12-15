import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>
      <p>Welcome, {user.email}!</p>
      {/* Add more dashboard content here */}
    </div>
  );
};

export default Dashboard;

