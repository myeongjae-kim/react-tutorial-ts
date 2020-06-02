import { CellValue } from "./CellValue";

const extractDiagonalLines = (squares: CellValue[][]): [CellValue[], CellValue[]] => {
  const fromLeft: CellValue[] = [];
  const fromRight: CellValue[] = [];

  for (let i = 0; i < squares.length; i++) {
    fromLeft.push(squares[i][i]);
  }

  const maxIndex = squares.length - 1;
  for (let i = maxIndex; i >= 0; i--) {
    fromRight.push(squares[i][maxIndex - i]);
  }

  return [fromLeft, fromRight];
}

const pivot = (squares: CellValue[][]): CellValue[][] => {
  const pivoted: CellValue[][] = squares.map(row => row.slice()); // deep copy
  
  let temp: CellValue;
  for (let row = 1; row < pivoted.length; row++) {
    for (let col = 0; col < row; col++) {
      temp = pivoted[row][col];
      pivoted[row][col] = pivoted[col][row];
      pivoted[col][row] = temp;
    }
  }

  return pivoted;
}

const areElementAllSame = (squares: CellValue[]): CellValue => squares.reduce((prev, curr) => {
  if (prev === curr) {
    return prev;
  }
  return null;
})

export enum LineDirection {
  UNDETERMINED, HORIZONTAL, VERTICAL, DIAGONAL
}

export interface WinnerData {
  cellValue: CellValue
  foundIndex: number
  lineDirection: LineDirection
}

const findNonNullValueWithIndex = (prev: WinnerData, curr: CellValue, index: number): WinnerData => {
  if (prev.cellValue != null) {
    return prev;
  }

  return {
    cellValue: curr,
    foundIndex: curr === null ? -1 : index,
    lineDirection: LineDirection.UNDETERMINED
  }
};

const hasHorizontalLine = (squares: CellValue[][]): WinnerData => squares
  .map(areElementAllSame)
  .reduce(findNonNullValueWithIndex, {cellValue: null, foundIndex: -1, lineDirection: LineDirection.UNDETERMINED})

const hasVerticalLine = (squares: CellValue[][]): WinnerData => hasHorizontalLine(pivot(squares));
const hasDiagonalLine = (squares: CellValue[][]): WinnerData => hasHorizontalLine(extractDiagonalLines(squares));

const checkFunctions = [hasHorizontalLine, hasVerticalLine, hasDiagonalLine];

export const calculateWinner = (squares: CellValue[][]): WinnerData => {
  const [horizontal, vertical, diagonal] = checkFunctions
  .map(check => check(squares));

  if (horizontal.cellValue != null) {
    return {...horizontal, lineDirection: LineDirection.HORIZONTAL}
  } else if (vertical.cellValue != null) {
    return {...vertical, lineDirection: LineDirection.VERTICAL}
  } else if (diagonal.cellValue != null) {
    return {...diagonal, lineDirection: LineDirection.DIAGONAL}
  } else {
    return {
      cellValue: null,
      foundIndex: -1,
      lineDirection: LineDirection.UNDETERMINED
    }
  }
}