import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, placeholder, error, className, ...props }) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none ${error ? 'border-rose-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-rose-500 text-xs mt-1 mr-2">{error}</p>}
    </div>
  );
};

export default InputField;
