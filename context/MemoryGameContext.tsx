import { createContext, useContext } from "react";
import { useMemoryGame } from "../hooks/useMemoryGame";
import type {
  MemoryGameContextValue,
  MemoryGameProviderProps,
} from "../types/game";

const MemoryGameContext = createContext<MemoryGameContextValue | null>(null);

export function MemoryGameProvider({
  options,
  fonts,
  children,
}: MemoryGameProviderProps) {
  const { game, indexesOfFlippedCards, turnPhase, flipCard } = useMemoryGame(
    options,
    fonts
  );

  const value: MemoryGameContextValue = {
    state: {
      game,
      indexesOfFlippedCards,
      turnPhase,
    },
    actions: {
      flipCard,
    },
  };

  return (
    <MemoryGameContext.Provider value={value}>
      {children}
    </MemoryGameContext.Provider>
  );
}

export const useMemoryGameContext = (): MemoryGameContextValue => {
  const context = useContext(MemoryGameContext);
  if (!context) {
    throw new Error("useMemoryGameContext must be used within MemoryGameProvider");
  }
  return context;
};
