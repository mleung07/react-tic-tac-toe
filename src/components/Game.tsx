import React from "react";
import Board from "./Board";
import { ai, helpers } from "../utils";
import { Players } from "../types";

const Game = () => {
  const [board, setBoard] = React.useState<string[]>(
    Array(9).fill(Players.EMPTY)
  );

  const [isFull, winner] = React.useMemo(
    () => [helpers.isFull(board), helpers.calculateWinner(board)],
    [board]
  );

  const highlight = React.useMemo(
    () => (winner ? helpers.highlight(board) : []),
    [board]
  );

  const shouldAiMove = React.useMemo(
    () => board.filter((x) => x !== Players.EMPTY).length % 2 === 1,
    [board]
  );

  React.useEffect(() => {
    if (winner || isFull || !shouldAiMove) {
      return;
    }
    const move = ai.bestMove(board.slice()) as number;
    const cells = board.slice();
    cells[move] = Players.AI;

    setBoard(cells);
  }, [board]);

  const handleClick = (i: number) => {
    const cells = board.slice();
    if (helpers.calculateWinner(cells) || cells[i]) {
      return;
    }
    cells[i] = shouldAiMove ? Players.AI : Players.HUMAN;
    setBoard(cells);
  };

  const restart = () => {
    setBoard(Array(9).fill(Players.EMPTY));
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
            cells={board}
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
