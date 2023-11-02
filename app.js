import Cell from './model/Cell.js';
import { alphabets, spreadSheetSize } from './config.js';

const spreadSheetContainerEl = document.getElementById('spreadsheet-container');
const exportBtn = document.querySelector('#export-btn');
const addRowBtn = document.querySelector('#add-row-btn');
const removeRowBtn = document.querySelector('#remove-row-btn');
const addColumnBtn = document.querySelector('#add-column-btn');
const removeColumnBtn = document.querySelector('#remove-column-btn');
const spreadSheet = [];

const init = () => {
  initSpreadSheet();
};

const initSpreadSheet = () => {
  for (let i = 0; i < spreadSheetSize.ROWS; i++) {
    let spreadSheetRow = [];
    for (let j = 0; j < spreadSheetSize.COLUMNS; j++) {
      let cellData = '';
      let isHeader = false;
      let disabled = false;
      if (i === 0) {
        cellData = alphabets[j - 1];
        isHeader = true;
        disabled = true;
      }
      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      if (!cellData) cellData = '';
      const cell = new Cell(i, j, cellData, isHeader, disabled);
      spreadSheetRow.push(cell);
    }
    spreadSheet.push(spreadSheetRow);
  }

  drawSpreadSheet(spreadSheet);
};

const drawSpreadSheet = (spreadSheet) => {
  spreadSheetContainerEl.innerHTML = '';
  for (let i = 0; i < spreadSheet.length; i++) {
    const rowContainerEl = document.createElement('div');
    rowContainerEl.className = 'cell-row';
    for (let j = 0; j < spreadSheet[i].length; j++) {
      const cell = spreadSheet[i][j];
      rowContainerEl.appendChild(createCellElement(cell));
    }
    spreadSheetContainerEl.appendChild(rowContainerEl);
  }
};

const createCellElement = (cell) => {
  const cellEl = document.createElement('input');
  cellEl.type = 'text';
  cellEl.className = 'cell';
  cellEl.id = 'cell_' + cell.row + cell.col;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;
  cellEl.dataset.row = cell.row;
  cellEl.dataset.col = cell.col;

  if (cell.isHeader) {
    cellEl.classList.add('header');
    cellEl.dataset.field = cell.data;
  }

  return cellEl;
};

const resetHeaderActiveStatus = () => {
  const headers = document.querySelectorAll('.header');
  headers.forEach((header) => header.classList.remove('active'));
};

// Event listeners
spreadSheetContainerEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('cell')) {
    resetHeaderActiveStatus();
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    const rowHeaderEL = document.querySelector(`#cell_${row}0`);
    const colHeaderEL = document.querySelector(`#cell_0${col}`);
    rowHeaderEL.classList.add('active');
    colHeaderEL.classList.add('active');
    const rowField = rowHeaderEL.dataset.field;
    const colField = colHeaderEL.dataset.field;

    document.querySelector('#cell-status').innerText = `${colField}${rowField}`;
  }
});

spreadSheetContainerEl.addEventListener('change', (e) => {
  if (e.target.classList.contains('cell')) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;
    spreadSheet[row][col].data = e.target.value;
  }
});

// 새로운 row 추가하기
addRowBtn.addEventListener('click', () => {
  if (spreadSheet.length < spreadSheetSize.ROWSLIMIT) {
    const newRow = [];
    for (let j = 0; j < spreadSheet[0].length; j++) {
      let cellData = '';
      let isHeader = false;
      let disabled = false;
      if (j === 0) {
        isHeader = true;
        disabled = true;
        cellData = spreadSheet.length;
      }
      const cell = new Cell(
        spreadSheet.length,
        j,
        cellData,
        isHeader,
        disabled,
      );
      newRow.push(cell);
    }
    spreadSheet.push(newRow);
    drawSpreadSheet(spreadSheet);
  } else {
    alert(`최대 ${spreadSheetSize.ROWSLIMIT - 1}행까지 추가할 수 있습니다.`);
  }
});

// row 제거하기
removeRowBtn.addEventListener('click', () => {
  if (spreadSheet.length > 2) {
    spreadSheet.pop();
    drawSpreadSheet(spreadSheet);
  } else {
    alert('최소한의 행은 삭제할 수 없습니다.');
  }
});

// 새로운 column 추가하기
addColumnBtn.addEventListener('click', () => {
  if (spreadSheet[0].length < spreadSheetSize.COLUMNSLIMIT) {
    for (let i = 0; i < spreadSheet.length; i++) {
      let cellData = '';
      let isHeader = false;
      let disabled = false;
      if (i === 0) {
        isHeader = true;
        disabled = true;
        cellData = alphabets[spreadSheet[0].length - 1];
      }
      const cell = new Cell(
        i,
        spreadSheet[i].length,
        cellData,
        isHeader,
        disabled,
      );
      spreadSheet[i].push(cell);
    }
    drawSpreadSheet(spreadSheet);
  } else {
    alert(`최대 ${spreadSheetSize.COLUMNSLIMIT - 1}열까지 추가할 수 있습니다.`);
  }
});

// column 제거하기
removeColumnBtn.addEventListener('click', () => {
  if (spreadSheet[0].length > 2) {
    spreadSheet.forEach((row) => row.pop());
    drawSpreadSheet(spreadSheet);
  } else {
    alert('최소한의 열은 삭제할 수 없습니다.');
  }
});

// 파일 추출 event
exportBtn.addEventListener('click', (e) => {
  if (confirm('해당 파일을 Export 하시겠습니까?')) {
    let csv = '';
    for (let i = 0; i < spreadSheet.length; i++) {
      if (i === 0) continue;
      csv +=
        spreadSheet[i]
          .filter((item) => !item.isHeader)
          .map((item) => item.data)
          .join(',') + '\r\n';
    }
    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'spreadsheet.csv';
    a.click();
  }
  return;
});

document.addEventListener('DOMContentLoaded', init);
