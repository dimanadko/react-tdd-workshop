export const gameStatus = board => {
  const isWin = symbol =>
    board[0].every(cell => cell === symbol) ||
    board[1].every(cell => cell === symbol) ||
    board[2].every(cell => cell === symbol) ||
    board.map((row, index) => row[index]).every(cell => cell === symbol) ||
    board.map((row, index) => row[2 - index]).every(cell => cell === symbol) ||
    board.map(row => row[0]).every(cell => cell === symbol) ||
    board.map(row => row[1]).every(cell => cell === symbol) ||
    board.map(row => row[2]).every(cell => cell === symbol);
  if (isWin('X')) {
    return 'X';
  }
  if (isWin('O')) {
    return 'O';
  }
  if (board.every(row => row.every(cell => cell !== ''))) {
    return 'tie';
  }
};
