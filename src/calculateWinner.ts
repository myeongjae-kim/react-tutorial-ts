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

const findNonNullValue = (prev: CellValue, curr: CellValue) => prev || curr;

const hasHorizontalLine = (squares: CellValue[][]): CellValue => squares
  .map(areElementAllSame)
  .reduce(findNonNullValue)

const hasVerticalLine = (squares: CellValue[][]): CellValue => hasHorizontalLine(pivot(squares));
const hasDiagonalLine = (squares: CellValue[][]): CellValue => hasHorizontalLine(extractDiagonalLines(squares));

const checkFunctions = [hasHorizontalLine, hasVerticalLine, hasDiagonalLine];

export const calculateWinner = (squares: CellValue[][]): CellValue => checkFunctions
  .map(check => check(squares))
  .reduce(findNonNullValue)