const { gameStatus } = require('./gameService');

test('X should win', () => {
  const board = [['X', 'X', 'X'], ['', '', ''], ['', '', '']];
  expect(gameStatus(board)).toBe('X');
});

test('X should win', () => {
  const board = [['X', '', ''], ['', 'X', ''], ['', '', 'X']];
  expect(gameStatus(board)).toBe('X');
});

test('O should win', () => {
  const board = [['O', '', ''], ['O', '', ''], ['O', '', '']];
  expect(gameStatus(board)).toBe('O');
});

test('tie', () => {
  const board = [['X', 'O', 'X'], ['O', 'X', 'O'], ['O', 'X', 'O']];
  expect(gameStatus(board)).toBe('tie');
});
