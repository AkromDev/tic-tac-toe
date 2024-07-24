'use client';
import React, { useState } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'cursor': 'pointer'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
  'cursor': 'pointer'
}

const emptySquares = Array(9).fill(null)

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onClick }) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={onClick}
    >
      {value}
    </div>
  );
}

function Board() {
  const [squares, setSquares] = useState(emptySquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squares) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  }

  const resetGame = () => {
    setSquares(emptySquares);
    setXIsNext(true);
  }

  const winner = calculateWinner(squares);
  const nextPlayer = xIsNext ? 'Next player: X': 'Next player: O'
  const isBoardFull = squares.every(square => square !== null);

  return (
    <div style={containerStyle} className="gameBoard">
      {!isBoardFull && !winner && (
        <div id="statusArea" className="status" style={instructionsStyle}>{nextPlayer}</div>
      )}
      {(isBoardFull || winner ) && (
        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner || 'None'}</span></div>
      )}
      <button style={buttonStyle} onClick={resetGame}>Reset</button>
      <div style={boardStyle}>
        {[0, 1, 2].map(row => (
          <div key={row} className="board-row" style={rowStyle}>
            {[0, 1, 2].map(col => (
              <Square
                key={3 * row + col}
                value={squares[3 * row + col]}
                onClick={() => handleClick(3 * row + col)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}