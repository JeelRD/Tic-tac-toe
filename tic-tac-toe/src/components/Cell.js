import React from 'react';

const Cell = ({ value, onClick }) => {
  return (
    <button 
      className={`cell ${value}`} 
      onClick={onClick} 
      disabled={value !== null}
    >
      {value}
    </button>
  );
};

export default Cell;
