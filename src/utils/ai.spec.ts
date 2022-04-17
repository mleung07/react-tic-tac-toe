import { Players } from "../types";
import ai from "./ai";

describe("ai", () => {
  describe("findForkableLines", () => {
    it("works when no lines", () => {
      const board = Array(9).fill(Players.EMPTY);
      const lines = ai.findForkableLines(board, Players.HUMAN);
      expect(lines).toEqual([]);
    });
    it("works when there is lines", () => {
      const board = ["", "O", "", "O", "X", "", "", "", ""];
      const lines = ai.findForkableLines(board, Players.HUMAN);
      expect(lines).toEqual([
        [0, 1, 2],
        [0, 3, 6],
      ]);
    });
  });

  describe("findIntersectCell", () => {
    it("find nothing when empty", () => {
      const board = Array(9).fill(Players.EMPTY);
      const cell = ai.findIntersectCell(board, []);
      expect(cell).toBe(undefined);
    });
    it("find cell correctly", () => {
      const board = ["", "O", "", "O", "X", "", "", "", ""];
      const cell = ai.findIntersectCell(board, [
        [0, 1, 2],
        [0, 3, 6],
      ]);
      expect(cell).toEqual(0);
    });
  });

  it("can win", () => {
    const board = ["X", "X", "", "", "O", "", "", "", "O"];
    const result = ai.bestMove(board);
    expect(result).toBe(2);
  });

  it("can block", () => {
    const board = ["O", "O", "", "", "X", "", "", "", "X"];
    const result = ai.bestMove(board);
    expect(result).toBe(2);
  });

  it("can fork", () => {
    const board = ["", "X", "O", "", "", "X", "", "", "O"];
    const result = ai.bestMove(board);
    expect(result).toBe(4);
  });

  it("can block fork", () => {
    const board = ["O", "", "X", "", "", "O", "", "", ""];
    const result = ai.bestMove(board);
    expect([3, 4]).toContain(result);
  });

  it("can get center", () => {
    const board = Array(9).fill(Players.EMPTY);
    const result = ai.bestMove(board);
    expect(result).toBe(4);
  });

  it("can get oppositie corner", () => {
    const board = ["O", "", "", "", "O", "", "", "X", ""];
    const result = ai.bestMove(board);
    expect(result).toBe(8);
  });

  it("can get corner", () => {
    const board = ["", "", "", "", "O", "", "", "", ""];
    const result = ai.bestMove(board);
    expect([0, 2, 6, 8]).toContain(result);
  });

  it("can get side", () => {
    const board = ["X", "O", "X", "", "O", "X", "O", "X", ")"];
    const result = ai.bestMove(board);
    expect(result).toBe(3);
  });

  it("can get random", () => {
    const board = Array(9).fill(Players.EMPTY);
    const result = ai.bestMove(board);
    expect(result).toBeDefined();
  });
});
