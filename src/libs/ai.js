// https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy

import helpers from './helpers';

let ai = {
  player: 'O',
  ai: 'X',
  lines: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  clone(Board) {
    let clone = Array(9).fill(null);
    clone = Board.map(elem => {
      return elem;
    });
    return clone;
  },

  emptyCells(Board) {
    let empty = [];
    Board.forEach((elem, index) => {
     if (elem === null) {
       empty.push(index);
     } 
    });
    return empty;
  },

  playerCells(Board) {
    let cells = [];
    Board.forEach((elem, index) => {
     if (elem === this.player) {
       cells.push(index);
     } 
    });
    return cells;
  },

  findFork(Board, sign) {
    let possibles = [];
    this.lines.forEach(line => {
      let myCount = 0;
      let nullCount = 0;
      line.forEach(cell => {
        myCount += Board[cell] === sign;
        nullCount += Board[cell] === null;
      })
      if(myCount === 1 && nullCount === 2) {
        possibles.push(line);
      }
    });
    return possibles;
  },

  findIntersect(Board, possibles, sign) {
    let cell = false;
    possibles.forEach((possible, index) => {
      while(index < possibles.length-1) {
        let trial = possibles[index];
        index += 1;
        let targetCell = possible.filter(n => trial.includes(n));
        if (Board[targetCell] === null) {
          cell = targetCell.toString();
        }
      }
    });
    return cell;
  },

  valid(move) {
    return move || move === 0;
  },

  bestMove(Board) {
    let move = false;

    move = this.canWin(Board);
    if(this.valid(move)) {
      console.log('win', move);
      return move;
    }
    
    move = this.canBlock(Board);
    if(this.valid(move)) {
      console.log('block', move);
      return move;
    }
    
    move = this.canFork(Board);
    if(this.valid(move)) {
      console.log('fork', move);
      return move;
    }
    
    move = this.canBlockFork(Board);
    if(this.valid(move)) {
      console.log('block fork', move);
      return move;
    }
    
    move = this.getCenter(Board);
    if(this.valid(move)) {
      console.log('center', move);
      return move;
    }
    
    move = this.getOppositeCorner(Board);
    if(this.valid(move)) {
      console.log('opp corner', move);
      return move;
    }
    
    move = this.getCorner(Board);
    if(this.valid(move)) {
      console.log('corner', move);
      return move;
    }
    
    move = this.getSide(Board);
    if(move) {
      console.log('side', move);
      return move;
    }

    return this.random(Board);
  },

  canWin(Board) {
    const cells = this.emptyCells(Board);
    let move = false;
    cells.forEach(cell => {
      let curr = this.clone(Board);
      curr[cell] = this.ai;
      if(helpers.calculateWinner(curr)) {
        move = cell;
        return;
      }
    });
    return move;
  },

  canBlock(Board) {
    const cells = this.emptyCells(Board);
    let move = false;
    cells.forEach(cell => {
      let curr = this.clone(Board);
      curr[cell] = this.player;
      if(helpers.calculateWinner(curr)) {
        move = cell;
        return;
      }
    });
    return move;
  },

  canFork(Board) {
    let possibles = this.findFork(Board, this.ai);
    let cell = this.findIntersect(Board, possibles, this.ai);
    return cell;
  },

  canBlockFork(Board) {
    let possibles = this.findFork(Board, this.player);
    let cell = this.findIntersect(Board, possibles, this.player);
    return cell;
  },

  getCenter(Board) {
    if(Board[4] === null) {
      return 4;
    }
    return false;
  },

  getOppositeCorner(Board) {
    let playerCells = this.playerCells(Board);
    let corners = playerCells.filter(n => [0, 2, 6, 8].includes(n));
    let opp = corners.map(n => 8-n);
    return opp[Math.floor(Math.random()*opp.length)];
  },

  getCorner(Board) {
    let corners = this.emptyCells(Board).filter(n => [0, 2, 6, 8].includes(n));
    return corners[Math.floor(Math.random()*corners.length)];
  },

  getSide(Board) {
    let sides = this.emptyCells(Board).filter(n => [1, 3, 5, 7].includes(n));
    return sides[Math.floor(Math.random()*sides.length)];
  },

  random(Board) {
    const cells = this.emptyCells(Board);
    return cells[Math.floor(Math.random()*cells.length)];
  }

};

export default ai;