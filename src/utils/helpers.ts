import { Board, Line } from "../types";

export const WINNING_LINES: Line[] = [
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
  calculateWinner(board: Board) {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return undefined;
  },

  highlight(board: Board) {
    for (const line of WINNING_LINES) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return line;
      }
    }
    return [];
  },

  isFull(board: Board) {
    return board.every((cell) => cell !== "");
  },

  getIndexByPlayer(board: Board, player: string) {
    return board.flatMap((cell, i) => (cell === player ? i : []));
  },
};

export default helpers;
