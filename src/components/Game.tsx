import React from 'react';
import Board from './Board';
import { ai, helpers } from '../utils';
import { Players } from '../types';

interface State {
  board: Array<string>;
}

const Game = () => {
  const [state, setState] = React.useState<State>({
    board: Array(9).fill(''),
  });

  const winner = React.useMemo(() => {
    return helpers.calculateWinner(state.board);
  }, [state.board]);

  const highlight = React.useMemo(() => {
    return helpers.highlight(state.board);
  }, [state.board]);

  const aiTurn = React.useMemo(() => {
    return state.board.filter(x => x !== '').length % 2 === 1;
  }, [state.board]);

  React.useEffect(() => {
    if (winner || helpers.isFull(state.board) || !aiTurn) {
      return;
    }
    const move = ai.bestMove(state.board.slice());
    if (typeof(move) === 'number') {
      const cells = state.board.slice();
      cells[move] = Players.X;

      setState({
        board: cells,
    });
    }
  }, [state]);

  const handleClick = (i: number) => {
    const cells = state.board.slice();
    if (helpers.calculateWinner(cells) || cells[i]) {
      return;
    }
    cells[i] = aiTurn ? Players.X : Players.O;
    setState({
      board: cells,
    });
  }

  const restart = () => {
    setState({
      board: Array(9).fill(''),
    })
  }

  let status = '';
  const restartBtn = <button onClick={() => restart()}>Restart</button>;
  let canRestart = true;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (helpers.isFull(state.board)) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (aiTurn ? Players.X : Players.O);
      canRestart = false;
    }
  }

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-wrapper">
        <div className="game-board">
          <Board cells={state.board} highlight={highlight} onClick={(i) => handleClick(i)}/>
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>{canRestart && restartBtn}</div>
      </div>
    </div>
  );
}

export default Game;