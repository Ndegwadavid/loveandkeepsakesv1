// src/components/ui/AlertDescription.js
import React from 'react';

const AlertDescription = ({ children, className }) => {
  return <div className={`alert-description ${className}`}>{children}</div>;
};

export default AlertDescription;
