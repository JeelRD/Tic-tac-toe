import React from 'react';
import Cell from './Cell';

const Board = ({ grid, onCellClick }) => {
  return (
    <div className="board">
      {grid.map((layer, x) => (
        <div key={x} className="layer">
          {layer.map((row, y) => (
            <div key={y} className="row">
              {row.map((cell, z) => (
                <Cell 
                  key={`${x}-${y}-${z}`} 
                  value={cell} 
                  onClick={() => onCellClick(x, y, z)} 
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
