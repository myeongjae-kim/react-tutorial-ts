import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CellValue } from './CellValue';
import { calculateWinner } from './calculateWinner';
import Board from './Board';

type History = Array<{
  squares: CellValue[]
}>;

const Game: React.FC = () => {
  const [history, setHistory] = React.useState<History>([{
    squares: Array(9).fill(null)
  }])
  const [xIsNext, setXIsNext] = React.useState(true);
  const [stepNumber, setStepNumber] = React.useState(0);

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
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

  const jumpTo = React.useCallback((step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0);
  }, []);

  const moves = history.map((_, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);