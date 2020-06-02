import * as React from 'react';
import { CellValue } from './CellValue';
import Square from './Square';

interface Props{
  squares: CellValue[][],
  onClick(row: number, col: number): void
}

const Board: React.FC<Props> = ({squares, onClick}) => {
  const renderSquare = React.useCallback((row: number, col: number) => 
    <Square
      value={squares[row][col]}
      onClick={() => onClick(row, col)}
    />
  , [onClick, squares]);

  return (
    <div>
      <div className="board-row">
        {renderSquare(0, 0)}
        {renderSquare(0, 1)}
        {renderSquare(0, 2)}
      </div>
      <div className="board-row">
        {renderSquare(1, 0)}
        {renderSquare(1, 1)}
        {renderSquare(1, 2)}
      </div>
      <div className="board-row">
        {renderSquare(2, 0)}
        {renderSquare(2, 1)}
        {renderSquare(2, 2)}
      </div>
    </div>
  );
}


export default Board;