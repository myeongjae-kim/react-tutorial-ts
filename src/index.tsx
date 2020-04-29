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

const Board: React.FC<{
  squares: CellValue[],
  onClick(i: number): void
}> = ({squares, onClick}) => {
  const renderSquare = React.useCallback((i: number) => {
    return <Square
      value={squares[i]}
      onClick={() => onClick(i)}
    />;
  }, [onClick, squares]);

  return (
    <div>
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
  const [history, setHistory] = React.useState<Array<{ squares: CellValue[] }>>([{
    squares: Array(9).fill(null)
  }])
  const [xIsNext, setXIsNext] = React.useState(true);

  const [stepNumber, setStepNumber] = React.useState(0);
  const jumpTo = React.useCallback((step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0);
  }, []);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const [status, setStatus] = React.useState<undefined | string>();
  React.useEffect(() => {
    if (winner) {
      setStatus('Winner: ' + winner);
    } else {
      setStatus('Next player: ' + (xIsNext ? 'X' : 'O'))
    }
  }, [winner, xIsNext]);

  const handleClick = React.useCallback((i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const squares = current.squares.slice();
    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares }]))
    setXIsNext(!xIsNext);
    setStepNumber(newHistory.length);
  }, [current.squares, history, stepNumber, winner, xIsNext]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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