import * as React from 'react';
import { CellValue } from './CellValue';

interface Props{
  value: CellValue
  onClick(): void
}

const Square: React.FC<Props> = ({ value, onClick }) =>
  <button className="square" onClick={onClick}>
    {value}
  </button>

export default Square;