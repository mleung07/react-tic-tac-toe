// https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
import { Players } from "../types";
import helpers, { WINNING_LINES } from "./helpers";

const ai = {
  emptyCells(board: string[]) {
    return board.flatMap((cell, index) =>
      cell === Players.EMPTY ? index : []
    );
  },

  playerCells(board: string[]) {
    return board.flatMap((cell, index) =>
      cell === Players.HUMAN ? index : []
    );
  },

  findFork(board: string[], player: string) {
    const possibles: number[][] = [];
    WINNING_LINES.forEach((line) => {
      let myCount = 0;
      let emptyCount = 0;
      line.forEach((cell) => {
        board[cell] === player && myCount++;
        board[cell] === Players.EMPTY && emptyCount++;
      });
      if (myCount === 1 && emptyCount === 2) {
        possibles.push(line);
      }
    });
    return possibles;
  },

  findIntersect(board: string[], possibles: number[][]) {
    const allCells = Array(9).fill(0);
    const emptyCells = this.emptyCells(board);
    possibles.flat(2).forEach((cell) => {
      allCells[cell] += 1;
    });
    const useableCells = allCells.map((cell, index) =>
      emptyCells.includes(index) ? cell : 0
    );
    const winableCells = useableCells
      .map((cell, index) => (cell > 1 ? index : undefined))
      .filter((cell) => cell !== undefined);
    if (winableCells && winableCells.length > 0) {
      return winableCells[Math.floor(Math.random() * winableCells.length)];
    }
    return undefined;
  },

  isValid(move: number | undefined) {
    return !!move || move === 0;
  },

  canWin(board: string[], player: string) {
    const cells = this.emptyCells(board);
    let move: number | undefined;
    cells.forEach((cell) => {
      const curr = [...board];
      curr[cell] = player;
      if (helpers.calculateWinner(curr)) {
        move = cell;
      }
    });
    return move;
  },

  canFork(board: string[], player: string) {
    const possibles = this.findFork(board, player);
    return this.findIntersect(board, possibles);
  },

  getCenter(board: string[]) {
    return board[4] === Players.EMPTY ? 4 : undefined;
  },

  getOppositeCorner(board: string[]) {
    const playerCells = this.playerCells(board);
    const corners = playerCells.filter((n) => [0, 2, 6, 8].includes(n));
    const opp = corners.map((n) => 8 - n);
    const playableCells = opp.filter((x) => this.emptyCells(board).includes(x));
    return playableCells[Math.floor(Math.random() * opp.length)];
  },

  getCorner(board: string[]) {
    const corners = this.emptyCells(board).filter((n) =>
      [0, 2, 6, 8].includes(n)
    );
    return corners[Math.floor(Math.random() * corners.length)];
  },

  getSide(board: string[]) {
    const sides = this.emptyCells(board).filter((n) =>
      [1, 3, 5, 7].includes(n)
    );
    return sides[Math.floor(Math.random() * sides.length)];
  },

  random(board: string[]) {
    const cells = this.emptyCells(board);
    return cells[Math.floor(Math.random() * cells.length)];
  },

  bestMove(board: string[]) {
    let move: number | undefined;

    move = this.canWin(board, Players.AI);
    if (this.isValid(move)) {
      console.log("win", move);
      return move;
    }

    move = this.canWin(board, Players.HUMAN);
    if (this.isValid(move)) {
      console.log("block", move);
      return move;
    }

    move = this.canFork(board, Players.AI);
    if (this.isValid(move)) {
      console.log("fork", move);
      return move;
    }

    move = this.canFork(board, Players.HUMAN);
    if (this.isValid(move)) {
      console.log("block fork", move);
      return move;
    }

    move = this.getCenter(board);
    if (this.isValid(move)) {
      console.log("center", move);
      return move;
    }

    move = this.getOppositeCorner(board);
    if (this.isValid(move)) {
      console.log("opp corner", move);
      return move;
    }

    move = this.getCorner(board);
    if (this.isValid(move)) {
      console.log("corner", move);
      return move;
    }

    move = this.getSide(board);
    if (move) {
      console.log("side", move);
      return move;
    }

    return this.random(board);
  },
};

export default ai;
