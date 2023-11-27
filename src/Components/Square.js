export const Square = ({ value, onSquareClick, highlight }) => {
  return (
    <button
      className={`square ${highlight ? 'winner' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};
