import * as React from 'react';
import { CellValue } from './CellValue';
import Square from './Square';
import { boardSize } from '.';

interface Props{
  squares: CellValue[][],
  onClick(row: number, col: number): void
}

const rangeClosed = (from: number, to: number) => Array(to).fill(null).map((_, i) => i + from)

const Board: React.FC<Props> = ({squares, onClick}) => {
  const renderSquare = React.useCallback((row: number, col: number) => 
    <Square
      value={squares[row][col]}
      onClick={() => onClick(row, col)}
    />
  , [onClick, squares]);

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