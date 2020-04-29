import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type CellValue = null | string;

const Square: React.FC<{
  value: CellValue
  onClick(): void
}> = ({value, onClick}) =>{
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

const Board: React.FC = () => {
  const [squares, setSquares] =
    React.useState<CellValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(false);

  const winner = calculateWinner(squares);
  const [status, setStatus] = React.useState<undefined | string>();
  React.useEffect(() => {
    if (winner) {
      setStatus('Winner: ' + winner);
    } else {
      setStatus('Next player: ' + (xIsNext ? 'X' : 'O'))
    }
  }, [winner, xIsNext]);

  const handleClick = React.useCallback((i: number) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  }, [squares, xIsNext])

  const renderSquare = React.useCallback((i: number) => {
    return <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
    />;
  }, [handleClick, squares]);

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game: React.FC = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

const calculateWinner = (squares: CellValue[]) => {
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);