import React from "react";
import Board from "./Board";
import { ai, helpers } from "../utils";
import { Players } from "../types";

interface State {
  board: string[];
}

const Game = () => {
  const [state, setState] = React.useState<State>({
    board: Array(9).fill(Players.EMPTY),
  });

  const [isFull, winner] = React.useMemo(
    () => [helpers.isFull(state.board), helpers.calculateWinner(state.board)],
    [state.board]
  );

  const highlight = React.useMemo(
    () => (winner ? helpers.highlight(state.board) : []),
    [state.board]
  );

  const shouldAiMove = React.useMemo(
    () => state.board.filter((x) => x !== Players.EMPTY).length % 2 === 1,
    [state.board]
  );

  React.useEffect(() => {
    if (winner || isFull || !shouldAiMove) {
      return;
    }
    const move = ai.bestMove(state.board.slice());
    if (move) {
      const cells = state.board.slice();
      cells[move] = Players.AI;

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
    cells[i] = shouldAiMove ? Players.AI : Players.HUMAN;
    setState({
      board: cells,
    });
  };

  const restart = () => {
    setState({
      board: Array(9).fill(Players.EMPTY),
    });
  };

  let status = "";
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isFull) {
    status = "Draw";
  } else {
    status = `Next player: ${shouldAiMove ? Players.AI : Players.HUMAN}`;
  }

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-wrapper">
        <div className="game-board">
          <Board
            cells={state.board}
            highlight={highlight}
            onClick={(i) => handleClick(i)}
          />
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>
          {(winner || isFull) && (
            <button onClick={() => restart()}>Restart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
