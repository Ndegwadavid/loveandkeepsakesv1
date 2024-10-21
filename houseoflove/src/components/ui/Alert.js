// src/components/ui/Alert.js
import React from 'react';
import AlertDescription from './AlertDescription'; // Ensure the path is correct

const Alert = ({ children, className }) => {
  return <div className={`alert ${className}`}>{children}</div>;
};

Alert.Description = AlertDescription; // Attach the AlertDescription to Alert

export default Alert;
