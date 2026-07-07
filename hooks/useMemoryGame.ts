import { useEffect, useReducer } from "react";
import {
  createShuffledBoard,
  resolveFlippedPair,
  type GameCard,
} from "../utils/gameLogic";

type TurnPhase = "idle" | "oneFlipped" | "resolving";

type MemoryGameState = {
  game: GameCard[];
  indexesOfFlippedCards: number[];
  turnPhase: TurnPhase;
};

type MemoryGameAction =
  | { type: "initialize"; game: GameCard[] }
  | { type: "flipCard"; cardIndex: number }
  | { type: "resolvePair"; updatedGame: GameCard[]; isMatch: boolean }
  | { type: "clearSelection" };

const initialState: MemoryGameState = {
  game: [],
  indexesOfFlippedCards: [],
  turnPhase: "idle",
};

const memoryGameReducer = (
  state: MemoryGameState,
  action: MemoryGameAction
): MemoryGameState => {
  switch (action.type) {
    case "initialize":
      return {
        ...initialState,
        game: action.game,
      };
    case "flipCard": {
      if (state.turnPhase === "resolving" || state.game[action.cardIndex]?.flipped) {
        return state;
      }

      if (state.turnPhase === "idle") {
        return {
          ...state,
          indexesOfFlippedCards: [action.cardIndex],
          turnPhase: "oneFlipped",
        };
      }

      if (
        state.turnPhase === "oneFlipped" &&
        state.indexesOfFlippedCards[0] !== action.cardIndex
      ) {
        return {
          ...state,
          indexesOfFlippedCards: [state.indexesOfFlippedCards[0], action.cardIndex],
          turnPhase: "resolving",
        };
      }

      return state;
    }
    case "resolvePair":
      return {
        ...state,
        game: action.updatedGame,
        turnPhase: action.isMatch ? "idle" : "resolving",
        indexesOfFlippedCards: action.isMatch ? [] : state.indexesOfFlippedCards,
      };
    case "clearSelection":
      return {
        ...state,
        indexesOfFlippedCards: [],
        turnPhase: "idle",
      };
    default:
      return state;
  }
};

export const useMemoryGame = (options: number, fonts: string[]) => {
  const [state, dispatch] = useReducer(memoryGameReducer, initialState);

  useEffect(() => {
    dispatch({ type: "initialize", game: createShuffledBoard(options, fonts) });
  }, [options, fonts]);

  useEffect(() => {
    if (state.turnPhase !== "resolving") {
      return;
    }

    const resolvedPair = resolveFlippedPair(state.game, state.indexesOfFlippedCards);
    if (!resolvedPair) {
      return;
    }

    dispatch({
      type: "resolvePair",
      updatedGame: resolvedPair.updatedGame,
      isMatch: resolvedPair.isMatch,
    });

    if (resolvedPair.isMatch) {
      return;
    }

    const timeoutId = setTimeout(() => {
      dispatch({ type: "clearSelection" });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [state.game, state.indexesOfFlippedCards, state.turnPhase]);

  return {
    game: state.game,
    indexesOfFlippedCards: state.indexesOfFlippedCards,
    turnPhase: state.turnPhase,
    flipCard: (cardIndex: number) => dispatch({ type: "flipCard", cardIndex }),
  };
};
