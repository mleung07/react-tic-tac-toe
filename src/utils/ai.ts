// https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
import { Players, Board, Line } from "../types";
import helpers, { WINNING_LINES } from "./helpers";

const ai = {
  findForkableLines(board: Board, player: string) {
    const possibles: Line[] = [];
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

  findIntersectCell(board: Board, possibles: Line[]) {
    const allCells = Array(9).fill(0);
    const emptyCells = helpers.getIndexByPlayer(board, Players.EMPTY);
    possibles.flat(2).forEach((cell) => {
      allCells[cell] += 1;
    });
    const useableCells = allCells.map((cell, i) =>
      emptyCells.includes(i) ? cell : 0
    );
    const winableCells = useableCells
      .map((cell, i) => (cell > 1 ? i : undefined))
      .filter((cell) => cell !== undefined);
    if (winableCells && winableCells.length > 0) {
      return winableCells[Math.floor(Math.random() * winableCells.length)];
    }
    return undefined;
  },

  isValid(move: number | undefined) {
    return move === 0 || !!move;
  },

  canWin(board: Board, player: string) {
    const cells = helpers.getIndexByPlayer(board, Players.EMPTY);
    let move: number | undefined;
    cells.forEach((cell) => {
      const curr = board.slice();
      curr[cell] = player;
      if (helpers.calculateWinner(curr)) {
        move = cell;
      }
    });
    return move;
  },

  canFork(board: Board, player: string) {
    const possibles = this.findForkableLines(board, player);
    return this.findIntersectCell(board, possibles);
  },

  canGetCenter(board: Board) {
    return board[4] === Players.EMPTY ? 4 : undefined;
  },

  canGetOppositeCorner(board: Board) {
    const playerCells = helpers.getIndexByPlayer(board, Players.HUMAN);
    const corners = playerCells.filter((n) => [0, 2, 6, 8].includes(n));
    const opp = corners.map((n) => 8 - n);
    const playableCells = opp.filter((x) =>
      helpers.getIndexByPlayer(board, Players.EMPTY).includes(x)
    );
    return playableCells[Math.floor(Math.random() * opp.length)];
  },

  canGetCorner(board: Board) {
    const emptyCells = helpers.getIndexByPlayer(board, Players.EMPTY);
    const corners = emptyCells.filter((n) => [0, 2, 6, 8].includes(n));
    return corners[Math.floor(Math.random() * corners.length)];
  },

  canGetSide(board: Board) {
    const emptyCells = helpers.getIndexByPlayer(board, Players.EMPTY);
    const sides = emptyCells.filter((n) => [1, 3, 5, 7].includes(n));
    return sides[Math.floor(Math.random() * sides.length)];
  },

  random(board: Board) {
    const cells = helpers.getIndexByPlayer(board, Players.EMPTY);
    return cells[Math.floor(Math.random() * cells.length)];
  },

  bestMove(board: Board) {
    let move: number | undefined;

    move = this.canWin(board, Players.AI);
    if (this.isValid(move)) {
      // console.log("win", move);
      return move;
    }

    move = this.canWin(board, Players.HUMAN);
    if (this.isValid(move)) {
      // console.log("block", move);
      return move;
    }

    move = this.canFork(board, Players.AI);
    if (this.isValid(move)) {
      // console.log("fork", move);
      return move;
    }

    move = this.canFork(board, Players.HUMAN);
    if (this.isValid(move)) {
      // console.log("block fork", move);
      return move;
    }

    move = this.canGetCenter(board);
    if (this.isValid(move)) {
      // console.log("center", move);
      return move;
    }

    move = this.canGetOppositeCorner(board);
    if (this.isValid(move)) {
      // console.log("opp corner", move);
      return move;
    }

    move = this.canGetCorner(board);
    if (this.isValid(move)) {
      // console.log("corner", move);
      return move;
    }

    move = this.canGetSide(board);
    if (move) {
      // console.log("side", move);
      return move;
    }

    return this.random(board);
  },
};

export default ai;
