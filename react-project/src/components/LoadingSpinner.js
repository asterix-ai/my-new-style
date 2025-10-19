import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingSpinner = ({ color = "#6366f1", size = 30, className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default LoadingSpinner;
