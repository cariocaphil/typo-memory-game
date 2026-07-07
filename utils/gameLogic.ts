import { shuffleArray } from "./utils";

type GameCard = {
  id: number;
  fontId: string;
  flipped: boolean;
  font: string;
};

export const createShuffledBoard = (
  options: number,
  fonts: string[]
): GameCard[] => {
  const cards: GameCard[] = [];
  for (let i = 0; i < options / 2; i++) {
    const card = {
      id: i,
      fontId: "font" + i,
      flipped: false,
      font: fonts && fonts[i],
    };
    cards.push(card);
    cards.push({ ...card });
  }
  return shuffleArray(cards);
};

export const isGameFinished = (game: GameCard[]): boolean => {
  return game.length > 0 && !game.some((card) => !card.flipped);
};

export const resolveFlippedPair = (
  game: GameCard[],
  indexesOfFlippedCards: number[]
): { updatedGame: GameCard[]; isMatch: boolean } | null => {
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
