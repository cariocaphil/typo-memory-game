import { describe, expect, it } from "vitest";
import {
  createShuffledBoard,
  isGameFinished,
  resolveFlippedPair,
} from "./gameLogic";

const makeCard = (id: number, fontId: string, flipped = false, font = "Font") => ({
  id,
  fontId,
  flipped,
  font,
});

describe("createShuffledBoard", () => {
  it("creates paired cards with matching font ids", () => {
    const board = createShuffledBoard(6, ["A", "B", "C"]);
    expect(board).toHaveLength(6);

    const counts = board.reduce<Record<string, number>>((acc, card) => {
      acc[card.fontId] = (acc[card.fontId] || 0) + 1;
      return acc;
    }, {});

    expect(Object.values(counts)).toEqual([2, 2, 2]);
    expect(board.every((card) => card.flipped === false)).toBe(true);
  });
});

describe("isGameFinished", () => {
  it("returns false for an empty board", () => {
    expect(isGameFinished([])).toBe(false);
  });

  it("returns false when at least one card is not flipped", () => {
    const board = [makeCard(0, "font0", true), makeCard(1, "font0", false)];
    expect(isGameFinished(board)).toBe(false);
  });

  it("returns true when all cards are flipped", () => {
    const board = [makeCard(0, "font0", true), makeCard(1, "font0", true)];
    expect(isGameFinished(board)).toBe(true);
  });
});

describe("resolveFlippedPair", () => {
  it("returns null when pair is incomplete", () => {
    const board = [makeCard(0, "font0"), makeCard(1, "font0")];
    expect(resolveFlippedPair(board, [0])).toBeNull();
  });

  it("returns mismatch signal when cards do not match", () => {
    const board = [makeCard(0, "font0"), makeCard(1, "font1")];
    const result = resolveFlippedPair(board, [0, 1]);

    expect(result).not.toBeNull();
    expect(result?.updatedGame).toBe(board);
    expect(result?.updatedIndexes).toEqual([0, 1, true]);
  });

  it("marks both cards as flipped when they match", () => {
    const board = [makeCard(0, "font0"), makeCard(1, "font0")];
    const result = resolveFlippedPair(board, [0, 1]);

    expect(result).not.toBeNull();
    expect(result?.updatedGame).not.toBe(board);
    expect(result?.updatedGame[0].flipped).toBe(true);
    expect(result?.updatedGame[1].flipped).toBe(true);
    expect(result?.updatedIndexes).toEqual([0, 1, false]);
  });
});
