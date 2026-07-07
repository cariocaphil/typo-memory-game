import { useEffect, useReducer } from "react";
import { createShuffledBoard, resolveFlippedPair } from "../utils/gameLogic";
import type {
  GameState,
  MemoryGameAction,
  MemoryGameControls,
} from "../types/game";

const initialState: GameState = {
  game: [],
  indexesOfFlippedCards: [],
  turnPhase: "idle",
};

const memoryGameReducer = (
  state: GameState,
  action: MemoryGameAction
): GameState => {
  switch (action.type) {
    case "initialize":
      return {
        ...initialState,
        game: action.game,
      };
    case "flipCard": {
      if (
        state.turnPhase === "resolving" ||
        state.game[action.cardIndex]?.flipped
      ) {
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
          indexesOfFlippedCards: [
            state.indexesOfFlippedCards[0],
            action.cardIndex,
          ],
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
        indexesOfFlippedCards: action.isMatch
          ? []
          : state.indexesOfFlippedCards,
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

export const useMemoryGame = (
  options: number,
  fonts: string[]
): MemoryGameControls => {
  const [state, dispatch] = useReducer(memoryGameReducer, initialState);

  useEffect(() => {
    dispatch({ type: "initialize", game: createShuffledBoard(options, fonts) });
  }, [options, fonts]);

  useEffect(() => {
    if (state.turnPhase !== "resolving") {
      return;
    }

    const resolvedPair = resolveFlippedPair(
      state.game,
      state.indexesOfFlippedCards
    );
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
