import * as React from 'react';
import { CellValue } from './CellValue';
import Square from './Square';
import { boardSize } from '.';
import { WinnerData, LineDirection } from './calculateWinner';

interface Props{
  squares: CellValue[][]
  winner: WinnerData
  onClick(row: number, col: number): void
}

const rangeClosed = (from: number, to: number) => Array(to).fill(null).map((_, i) => i + from)

const Board: React.FC<Props> = ({squares, winner, onClick}) => {
  const getBackground = React.useCallback((row: number, col: number): string | undefined => {
    const color = "#ffff00"

    switch (winner.lineDirection) {
      case LineDirection.HORIZONTAL:
        if (row === winner.foundIndex) {
          return color;
        }
        break;
      case LineDirection.VERTICAL:
        if (col === winner.foundIndex) {
          return color;
        }
        break;
      case LineDirection.DIAGONAL:
        if (
          (winner.foundIndex === 0 && row === col) // fromLeft
          || (winner.foundIndex === 1 && row + col === boardSize - 1) // fromRight
        ) {
          return color;
        }
        break;
      default:
    }

    return undefined;
  }, [winner.foundIndex, winner.lineDirection]);

  const renderSquare = React.useCallback((row: number, col: number) =>
    <Square
      value={squares[row][col]}
      onClick={() => onClick(row, col)}
      background={getBackground(row, col)}
    />
    , [getBackground, onClick, squares]);

  const result = rangeClosed(0, boardSize)
    .map(row => rangeClosed(0, boardSize)
      .map(col => renderSquare(row, col)));

  return (
    <div>
      {result.map(row => <div className="board=row">{row}</div>)}
    </div>
  );
}


export default Board;