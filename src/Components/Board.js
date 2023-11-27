import React from 'react';
import { Square } from './Square';
import { calculateWinner } from './Logic';

export const Board = ({ xIsNext, squares, onPlay }) => {
  const { winner, line } = calculateWinner(squares);
  const draw = squares.every((element) => element !== null);
  const status = winner
    ? `Winner: ${winner}`
    : draw
    ? 'Game is draw'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (row, col, i) => {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, { row, col });
  };

  const renderSquare = (row, col) => {
    const index = row * 3 + col;
    const isWinnerSquare = line && line.includes(index);

    return (
      <Square
        key={index}
        value={squares[index]}
        onSquareClick={() => handleClick(row, col, index)}
        highlight={isWinnerSquare}
      />
    );
  };

  const renderBoardRow = (row) => (
    <div className='board-row' key={row}>
      {[0, 1, 2].map((col) => renderSquare(row, col))}
    </div>
  );

  return (
    <>
      <div className='status'>{status}</div>
      {[0, 1, 2].map((row) => renderBoardRow(row))}
    </>
  );
};
