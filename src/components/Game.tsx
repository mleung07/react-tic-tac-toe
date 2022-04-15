import React from 'react';
import Board from './Board';
import { ai, helpers } from '../utils';
import { Players } from '../types';

interface State {
  history: Array<{
    squares: Array<string>;
  }>;
  stepNumber: number;
  xIsNext: boolean;
  highlight: Array<number>;
}

const Game = () => {
  const [state, setState] = React.useState<State>({
    history: [{
      squares: Array(9).fill(''),
    }],
    stepNumber: 0,
    xIsNext: false,
    highlight: []
  });

  const handleClick = (i: number) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (helpers.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? Players.X : Players.O;
    setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      highlight: helpers.highlight(squares),
    });
  }

  const restart = () => {
    setState({
      history: [{
        squares: Array(9).fill(''),
      }],
      stepNumber: 0,
      xIsNext: false,
      highlight: [],
    })
  }

  React.useEffect(() => {
    const history = state.history;
    const current = history[state.stepNumber];
    const winner = helpers.calculateWinner(current.squares);
      
    if (!winner && history.length < 9) {
      const aiMove = state.xIsNext;
      if (aiMove) {
        const move = ai.bestMove(current.squares.slice());
        if (typeof(move) === 'number') {
          const squares = current.squares.slice();
          squares[move] = Players.X;

          setState({
            history: history.concat([{
              squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !aiMove,
            highlight: helpers.highlight(squares),
          });
        }
      }
    }
  }, [state]);

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = helpers.calculateWinner(current.squares);
  const highlight = state.highlight;

  let status = '';
  const restartBtn = <button onClick={() => restart()}>Restart</button>;
  let canRestart = true;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (helpers.isFull(current.squares)) {
      status = 'Draw';
    } else {
      status = 'Next player: ' + (state.xIsNext ? Players.X : Players.O);
      canRestart = false;
    }
  }

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-wrapper">
        <div className="game-board">
          <Board squares={current.squares} highlight={highlight} onClick={(i) => handleClick(i)}/>
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