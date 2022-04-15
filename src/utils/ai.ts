// https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
import { Players } from '../types';
import helpers, { WINNING_LINES } from './helpers';

const ai = {
  player: Players.O,
  ai: Players.X,
  lines: WINNING_LINES,

  clone(board: string[]) {
    let clone = Array(9).fill('');
    clone = board.map(elem => {
      return elem;
    });
    return clone;
  },

  emptyCells(board: string[]) {
    const empty: number[] = [];
    board.forEach((elem, index) => {
     if (elem === '') {
       empty.push(index);
     } 
    });
    return empty;
  },

  playerCells(board: string[]) {
    const cells: number[] = [];
    board.forEach((elem, index) => {
     if (elem === this.player) {
       cells.push(index);
     } 
    });
    return cells;
  },

  findFork(board: string[], player: string) {
    const possibles: number[][] = [];
    this.lines.forEach(line => {
      let myCount = 0;
      let emptyCount = 0;
      line.forEach(cell => {
        board[cell] === player && myCount++;
        board[cell] === '' && emptyCount++;
      })
      if(myCount === 1 && emptyCount === 2) {
        possibles.push(line);
      }
    });
    return possibles;
  },

  // todo: accept player as props
  findIntersect(board: string[], possibles: number[][]) {
    const allCells = Array(9).fill(0);
    const emptyCells = this.emptyCells(board);
    possibles.forEach((possible, index) => {
      possible.forEach((cell) => {
        allCells[cell]++;
      })
    });
    const useableCells = allCells.map((e,i) => emptyCells.includes(i) ? e : 0);
    const winableCells = useableCells.map((e,i) => e > 1 ? i : undefined).filter(x => x !== undefined);
    if(winableCells && winableCells.length > 0) {
      return winableCells[Math.floor(Math.random()*winableCells.length)];
    }
    return false;
  },

  // fixme: typings
  isValid(move: number | boolean | undefined) {
    return !!move || move === 0;
  },

  canWin(board: string[]) {
    const cells = this.emptyCells(board);
    let move: number | boolean = false;
    cells.forEach(cell => {
      const curr = this.clone(board);
      curr[cell] = this.ai;
      if(helpers.calculateWinner(curr)) {
        move = cell;
        return;
      }
    });
    return move;
  },

  canBlock(board: string[]) {
    const cells = this.emptyCells(board);
    let move: number | boolean = false;
    cells.forEach(cell => {
      let curr = this.clone(board);
      curr[cell] = this.player;
      if(helpers.calculateWinner(curr)) {
        move = cell;
        return;
      }
    });
    return move;
  },

  canFork(board: string[]) {
    const possibles = this.findFork(board, this.ai);
    const cell = this.findIntersect(board, possibles);
    return cell;
  },

  canBlockFork(board: string[]) {
    const possibles = this.findFork(board, this.player);
    const cell = this.findIntersect(board, possibles);
    return cell;
  },

  getCenter(board: string[]) {
    return board[4] === '' ? 4 : false;
  },

  getOppositeCorner(board: string[]) {
    const playerCells = this.playerCells(board);
    const corners = playerCells.filter(n => [0, 2, 6, 8].includes(n));
    const opp = corners.map(n => 8 - n);
    const playableCells = opp.filter(x => this.emptyCells(board).includes(x));
    return playableCells[Math.floor(Math.random()*opp.length)];
  },

  getCorner(board: string[]) {
    const corners = this.emptyCells(board).filter(n => [0, 2, 6, 8].includes(n));
    return corners[Math.floor(Math.random()*corners.length)];
  },

  getSide(board: string[]) {
    const sides = this.emptyCells(board).filter(n => [1, 3, 5, 7].includes(n));
    return sides[Math.floor(Math.random()*sides.length)];
  },

  random(board: string[]) {
    const cells = this.emptyCells(board);
    return cells[Math.floor(Math.random()*cells.length)];
  },

  bestMove(board: string[]) {
    let move: number | boolean | undefined = false;

    move = this.canWin(board);
    if(this.isValid(move)) {
      console.log('win', move);
      return move;
    }
    
    move = this.canBlock(board);
    if(this.isValid(move)) {
      console.log('block', move);
      return move;
    }
    
    move = this.canFork(board);
    if(this.isValid(move)) {
      console.log('fork', move);
      return move;
    }
    
    move = this.canBlockFork(board);
    if(this.isValid(move)) {
      console.log('block fork', move);
      return move;
    }
    
    move = this.getCenter(board);
    if(this.isValid(move)) {
      console.log('center', move);
      return move;
    }
    
    move = this.getOppositeCorner(board);
    if(this.isValid(move)) {
      console.log('opp corner', move);
      return move;
    }
    
    move = this.getCorner(board);
    if(this.isValid(move)) {
      console.log('corner', move);
      return move;
    }
    
    move = this.getSide(board);
    if(move) {
      console.log('side', move);
      return move;
    }

    return this.random(board);
  },
};

export default ai;