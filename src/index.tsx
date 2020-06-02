import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CellValue } from './CellValue';
import { calculateWinner } from './calculateWinner';
import Board from './Board';
import { Point } from './Point';

export const boardSize = 3;

export enum HistoryOrder {
  ASCENDING, DESCENDING
}

type History = Array<{
  squares: CellValue[][]
  move: Point
}>;

const Game: React.FC = () => {
  const [history, setHistory] = React.useState<History>([{
    squares: Array(boardSize).fill(Array(boardSize).fill(null)),
    move: {row: -1, col: -1}
  }])
  const [historyOrder, setHistoryOrder] = React.useState(HistoryOrder.ASCENDING);
  const toggleHistoryOrder = React.useCallback(() => {
    setHistoryOrder(historyOrder === HistoryOrder.ASCENDING
      ? HistoryOrder.DESCENDING
      : HistoryOrder.ASCENDING)
  }, [historyOrder]);

  const [xIsNext, setXIsNext] = React.useState(true);
  const [currentStep, setCurrentStep] = React.useState(0);

  const current = history[currentStep];
  const winner = calculateWinner(current.squares);
  const [status, setStatus] = React.useState<undefined | string>();
  React.useEffect(() => {
    if (winner.cellValue) {
      setStatus('Winner: ' + winner.cellValue);
    } else {
      setStatus('Next player: ' + (xIsNext ? 'X' : 'O'))
    }
  }, [winner, xIsNext]);

  const handleClick = React.useCallback((row: number, col: number) => {
    const newHistory = history.slice(0, currentStep + 1);
    const squares = current.squares.map(row => row.slice());
    if (winner.cellValue || squares[row][col]) {
      return;
    }
    squares[row][col] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{
      squares,
      move: { row, col }
    }]))
    setXIsNext(!xIsNext);
    setCurrentStep(newHistory.length);
  }, [current.squares, history, currentStep, winner, xIsNext]);

  const jumpTo = React.useCallback((step: number) => {
    setCurrentStep(step)
    setXIsNext(step % 2 === 0);
  }, []);

  const moves = history.map(({ move }, step) => {
    const desc = step ?
      `Go to move #${step}: (${move.col}, ${move.row})` :
      'Go to game start';
    return (
      <li key={step}>
        <button onClick={() => jumpTo(step)} style={{
          fontWeight: currentStep === step ? "bold" : undefined
        }}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(row, col) => handleClick(row, col)}
          winner={winner}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggleHistoryOrder}>Reverse history</button>
        <ol>{historyOrder === HistoryOrder.ASCENDING ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);