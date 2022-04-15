export const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const helpers = {
  calculateWinner(squares: Array<string | null>) {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return undefined;
  },

  highlight(squares: Array<string | null>) {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return WINNING_LINES[i];
      }
    }
    return [];
  },

  isFull(squares: Array<string | null>) {
    return squares.every((square) => {
      return square !== '';
    })
  }
}

export default helpers;