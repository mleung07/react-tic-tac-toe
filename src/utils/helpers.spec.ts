import { Players } from "../types";
import helpers from "./helpers";

describe("helpers", () => {
  describe("calculateWinnner", () => {
    it("works when no winner", () => {
      const board = Array(9).fill(Players.EMPTY);
      const winner = helpers.calculateWinner(board);
      expect(winner).toBe(undefined);
    });
    it("works when there is winner", () => {
      const board = ["X", "X", "X", "", "", "", "", "O", "O"];
      const winner = helpers.calculateWinner(board);
      expect(winner).toBe("X");
    });
  });

  describe("highlight", () => {
    it("works when no winner", () => {
      const board = Array(9).fill(Players.EMPTY);
      const highlight = helpers.highlight(board);
      expect(highlight).toEqual([]);
    });
    it("works when there is winner", () => {
      const board = ["X", "X", "X", "", "", "", "", "O", "O"];
      const highlight = helpers.highlight(board);
      expect(highlight).toEqual([0, 1, 2]);
    });
  });

  describe("isFull", () => {
    it("return false", () => {
      const board = Array(9).fill(Players.EMPTY);
      const full = helpers.isFull(board);
      expect(full).toBeFalsy();
    });
    it("return true", () => {
      const board = Array(9).fill(Players.HUMAN);
      const full = helpers.isFull(board);
      expect(full).toBeTruthy();
    });
  });

  describe("getIndexByPlayer", () => {
    it("gets correctly", () => {
      const board = ["X", "X", "X", "", "", "", "", "O", "O"];
      const human = helpers.getIndexByPlayer(board, Players.HUMAN);
      expect(human).toEqual([7, 8]);
      const ai = helpers.getIndexByPlayer(board, Players.AI);
      expect(ai).toEqual([0, 1, 2]);
      const empty = helpers.getIndexByPlayer(board, Players.EMPTY);
      expect(empty).toEqual([3, 4, 5, 6]);
    });
  });
});
