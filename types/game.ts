import type { ReactNode } from "react";

export type Card = {
  id: number;
  fontId: string;
  flipped: boolean;
  font: string;
};

export type TurnPhase = "idle" | "oneFlipped" | "resolving";

export type GameState = {
  game: Card[];
  indexesOfFlippedCards: number[];
  turnPhase: TurnPhase;
};

export type MemoryGameAction =
  | { type: "initialize"; game: Card[] }
  | { type: "flipCard"; cardIndex: number }
  | { type: "resolvePair"; updatedGame: Card[]; isMatch: boolean }
  | { type: "clearSelection" };

export type ResolvePairResult = {
  updatedGame: Card[];
  isMatch: boolean;
};

export type FlipCardHandler = (cardIndex: number) => void;
export type StartOverHandler = () => void;

export type PanelProps = {
  alwaysDifferentLetter: boolean;
  showFontInfo: boolean;
  handleStartOver: StartOverHandler;
  handleChangeLetter: () => void;
  handleChangeLetterCase: () => void;
  handleLetterVariation: (alwaysDifferentLetter: boolean) => void;
  handleFontNameDisplay: (showFontInfo: boolean) => void;
};

export type MemoryGameControls = {
  game: Card[];
  indexesOfFlippedCards: number[];
  turnPhase: TurnPhase;
  flipCard: FlipCardHandler;
};

export type MemoryGameContextValue = {
  state: {
    game: Card[];
    indexesOfFlippedCards: number[];
    turnPhase: TurnPhase;
  };
  actions: {
    flipCard: FlipCardHandler;
  };
};

export type MemoryGameProviderProps = {
  options: number;
  fonts: string[];
  children: ReactNode;
};

export type GameProps = {
  options: number;
  letterToBeDisplayed: string;
  showFontInfo: boolean;
  alwaysDifferentLetter: boolean;
  fonts: string[];
  backgroundColor: string;
  letters: string[];
  handleStartOver: StartOverHandler;
};

export type CardProps = {
  id: number;
  letterToBeDisplayed: string;
  font: string;
  showFontInfo: boolean;
  backgroundColor: string;
};
