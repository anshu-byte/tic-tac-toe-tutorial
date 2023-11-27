import React, { useState } from 'react';
import { Board } from './Board';

export const Game = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), position: { row: -1, col: -1 } },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentStep = history[currentMove];

  const handlePlay = (nextSquares, position) => {
    const newHistory = history.slice(0, currentMove + 1);
    const nextHistory = [...newHistory, { squares: nextSquares, position }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const renderMoves = () =>
    history.map((step, move) => {
      const description =
        move > 0
          ? `Go to move (${step.position.row}, ${step.position.col})`
          : 'Go to game start';
      return (
        <li key={move}>
          {currentMove !== move || move === 0 ? (
            <button onClick={() => jumpTo(move)}>{description}</button>
          ) : (
            <strong>
              You are at move ({step.position.row}, {step.position.col})
            </strong>
          )}
        </li>
      );
    });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          squares={currentStep.squares}
          onPlay={handlePlay}
        />
      </div>
      <div className='game-info'>
        <ol>{renderMoves()}</ol>
      </div>
    </div>
  );
};
