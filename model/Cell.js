export default class Cell {
  constructor(row, col, data, isHeader, disabled) {
    this.row = row;
    this.col = col;
    this.data = data;
    this.isHeader = isHeader;
    this.disabled = disabled;
  }
}
