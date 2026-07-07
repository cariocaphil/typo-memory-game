import type { Card, ResolvePairResult } from "../types/game";
import { shuffleArray } from "./utils";

export const createShuffledBoard = (
  options: number,
  fonts: string[]
): Card[] => {
  const cards: Card[] = [];
  for (let i = 0; i < options / 2; i++) {
    cards.push({
      id: i * 2,
      fontId: "font" + i,
      flipped: false,
      font: fonts && fonts[i],
    });
    cards.push({
      id: i * 2 + 1,
      fontId: "font" + i,
      flipped: false,
      font: fonts && fonts[i],
    });
  }
  return shuffleArray(cards);
};

export const isGameFinished = (game: Card[]): boolean => {
  return game.length > 0 && !game.some((card) => !card.flipped);
};

export const getCardDisplayLetter = (
  card: Card,
  alwaysDifferentLetter: boolean,
  letters: string[],
  sharedLetter: string
): string => {
  if (!alwaysDifferentLetter) {
    return sharedLetter;
  }
  return letters[card.id];
};

export const resolveFlippedPair = (
  game: Card[],
  indexesOfFlippedCards: number[]
): ResolvePairResult | null => {
  if (indexesOfFlippedCards.length !== 2 || game.length === 0) {
    return null;
  }

  const [firstIndex, secondIndex] = indexesOfFlippedCards;
  if (typeof firstIndex !== "number" || typeof secondIndex !== "number") {
    return null;
  }
  const match = game[firstIndex].fontId === game[secondIndex].fontId;

  if (!match) {
    return {
      updatedGame: game,
      isMatch: false,
    };
  }

  const updatedGame = [...game];
  updatedGame[firstIndex] = { ...updatedGame[firstIndex], flipped: true };
  updatedGame[secondIndex] = { ...updatedGame[secondIndex], flipped: true };

  return {
    updatedGame,
    isMatch: true,
  };
};
