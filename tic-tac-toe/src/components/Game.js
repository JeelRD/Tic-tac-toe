import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
  const [grid, setGrid] = useState(Array(4).fill().map(() => Array(4).fill().map(() => Array(4).fill(null))));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const aiMove = makeRandomMove(grid);
      if (aiMove) {
        handleCellClick(aiMove.x, aiMove.y, aiMove.z);
      }
    }
  }, [isPlayerTurn, winner, grid]);

  const handleCellClick = (x, y, z) => {
    if (grid[x][y][z] || winner) return;

    const newGrid = grid.map((layer, i) => 
      layer.map((row, j) => 
        row.map((cell, k) => 
          (i === x && j === y && k === z) ? (isPlayerTurn ? 'X' : 'O') : cell
        )
      )
    );

    setGrid(newGrid);
    setIsPlayerTurn(!isPlayerTurn);

    const win = checkWin(newGrid);
    if (win) {
      setWinner(win);
    }
  };

  const makeRandomMove = (grid) => {
    const emptyCells = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        for (let z = 0; z < 4; z++) {
          if (!grid[x][y][z]) {
            emptyCells.push({ x, y, z });
          }
        }
      }
    }
    if (emptyCells.length === 0) return null;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const checkWin = (grid) => {
    const lines = [];

    // Check rows, columns, and diagonals in each layer
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // Rows
        lines.push(grid[i][j]);
        // Columns
        lines.push(grid[i].map(row => row[j]));
      }
      // Diagonals
      lines.push([grid[i][0][0], grid[i][1][1], grid[i][2][2], grid[i][3][3]]);
      lines.push([grid[i][0][3], grid[i][1][2], grid[i][2][1], grid[i][3][0]]);
      lines.push([grid[0][i][0], grid[1][i][1], grid[2][i][2], grid[3][i][3]]);
      lines.push([grid[0][i][3], grid[1][i][2], grid[2][i][1], grid[3][i][0]]);
      lines.push([grid[0][0][i], grid[1][1][i], grid[2][2][i], grid[3][3][i]]);
      lines.push([grid[0][3][i], grid[1][2][i], grid[2][1][i], grid[3][0][i]]);
    }

    // Check diagonals across layers
    lines.push([grid[0][0][0], grid[1][1][1], grid[2][2][2], grid[3][3][3]]);
    lines.push([grid[0][0][3], grid[1][1][2], grid[2][2][1], grid[3][3][0]]);
    lines.push([grid[0][3][0], grid[1][2][1], grid[2][1][2], grid[3][0][3]]);
    lines.push([grid[0][3][3], grid[1][2][2], grid[2][1][1], grid[3][0][0]]);

    for (const line of lines) {
      if (line.every(cell => cell === 'X')) return 'X';
      if (line.every(cell => cell === 'O')) return 'O';
    }

    return null;
  };

  const startNewGame = () => {
    setGrid(Array(4).fill().map(() => Array(4).fill().map(() => Array(4).fill(null))));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <div className="App">
      <div className="game-header">
        <h1>3D Tic Tac Toe</h1>
      </div>
      <div className="game">
        <div className="board-container">
          <div className="board-row">
            <div className="layer">
              {[0, 1, 2, 3].map((x) => (
                <div className="row" key={x}>
                  {[0, 1, 2, 3].map((y) => (
                    <div className="cell" 
                         key={y} 
                         onClick={() => handleCellClick(x, y, 0)}
                         disabled={grid[x][y][0]}>
                      {grid[x][y][0]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="layer">
              {[0, 1, 2, 3].map((x) => (
                <div className="row" key={x}>
                  {[0, 1, 2, 3].map((y) => (
                    <div className="cell" 
                         key={y} 
                         onClick={() => handleCellClick(x, y, 1)}
                         disabled={grid[x][y][1]}>
                      {grid[x][y][1]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="board-row">
            <div className="layer">
              {[0, 1, 2, 3].map((x) => (
                <div className="row" key={x}>
                  {[0, 1, 2, 3].map((y) => (
                    <div className="cell" 
                         key={y} 
                         onClick={() => handleCellClick(x, y, 2)}
                         disabled={grid[x][y][2]}>
                      {grid[x][y][2]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="layer">
              {[0, 1, 2, 3].map((x) => (
                <div className="row" key={x}>
                  {[0, 1, 2, 3].map((y) => (
                    <div className="cell" 
                         key={y} 
                         onClick={() => handleCellClick(x, y, 3)}
                         disabled={grid[x][y][3]}>
                      {grid[x][y][3]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="new-game-button" onClick={startNewGame}>Start New Game</button>
        {winner && <h2>Winner: {winner}</h2>}
      </div>
      <div className="game-footer">
        <p>	&#169; Jeel Dungarani</p>
      </div>
    </div>
  );
};

export default Game;
