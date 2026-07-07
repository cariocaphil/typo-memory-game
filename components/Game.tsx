import React, { useState, useEffect } from "react";
import Card from "./Card";
import dynamic from "next/dynamic";
import { isGameFinished, getCardDisplayLetter } from "../utils/gameLogic";
import {
  MemoryGameProvider,
  useMemoryGameContext,
} from "../context/MemoryGameContext";
import type { GameProps } from "../types/game";
import styles from "./Game.module.css";

const Modal = dynamic(() => import("antd/lib/modal"), {
  ssr: false,
});

function GameBoard({
  letterToBeDisplayed,
  showFontInfo,
  alwaysDifferentLetter,
  backgroundColor,
  letters,
  handleStartOver,
}: Omit<GameProps, "options" | "fonts">) {
  const {
    state: { game },
  } = useMemoryGameContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isGameFinished(game)) {
      return;
    }

    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [game]);

  return (
    <>
      <div className={styles.cardsSection}>
        {game.map((card, index) => (
          <Card
            key={card.id}
            index={index}
            letterToBeDisplayed={getCardDisplayLetter(
              card,
              alwaysDifferentLetter,
              letters,
              letterToBeDisplayed
            )}
            font={card.font}
            showFontInfo={showFontInfo}
            backgroundColor={backgroundColor}
          />
        ))}
      </div>
      <Modal
        title="Well Done!"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          handleStartOver();
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        Would you like to play again?
      </Modal>
    </>
  );
}

function Game({
  options,
  fonts,
  letterToBeDisplayed,
  showFontInfo,
  alwaysDifferentLetter,
  backgroundColor,
  letters,
  handleStartOver,
}: GameProps) {
  return (
    <MemoryGameProvider options={options} fonts={fonts}>
      <GameBoard
        letterToBeDisplayed={letterToBeDisplayed}
        showFontInfo={showFontInfo}
        alwaysDifferentLetter={alwaysDifferentLetter}
        backgroundColor={backgroundColor}
        letters={letters}
        handleStartOver={handleStartOver}
      />
    </MemoryGameProvider>
  );
}

export default Game;
