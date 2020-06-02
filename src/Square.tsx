import * as React from 'react';
import { CellValue } from './CellValue';

interface Props{
  value: CellValue
  background?: string
  onClick(): void
}

const Square: React.FC<Props> = ({ value, background, onClick }) =>
  <button className="square" onClick={onClick} style={{ background }}>
    {value}
  </button>

export default Square;