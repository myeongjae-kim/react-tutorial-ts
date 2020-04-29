import * as React from 'react';
import { CellValue } from './CellValue';
import Square from './Square';

interface Props{
  squares: CellValue[],
  onClick(i: number): void
}

const Board: React.FC<Props> = ({squares, onClick}) => {
  const renderSquare = React.useCallback((i: number) => 
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
    />
  , [onClick, squares]);

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


export default Board;