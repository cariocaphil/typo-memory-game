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

export type PanelHandlers = {
  handleStartOver: StartOverHandler;
  handleChangeLetter: () => void;
  handleChangeLetterCase: () => void;
  handleLetterVariation: () => void;
  handleFontNameDisplay: () => void;
};

export type MemoryGameControls = {
  game: Card[];
  indexesOfFlippedCards: number[];
  turnPhase: TurnPhase;
  flipCard: FlipCardHandler;
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
  game: Card[];
  indexesOfFlippedCards: number[];
  handleFlipCard: FlipCardHandler;
  turnPhase: TurnPhase;
  letterToBeDisplayed: string;
  font: string;
  showFontInfo: boolean;
  backgroundColor: string;
};
