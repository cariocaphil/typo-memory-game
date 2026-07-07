import React, { useState, useEffect } from "react";
import Card from "./Card";
import dynamic from "next/dynamic";
import { isGameFinished, getCardDisplayLetter } from "../utils/gameLogic";
import {
  MemoryGameProvider,
  useMemoryGameContext,
} from "../context/MemoryGameContext";
import type { GameProps } from "../types/game";

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isGameFinished(game)) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 500);
    }
  }, [game]);

  return (
    <>
      <div className="cards-section">
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
      {isModalVisible && (
        <Modal
          title="Well Done!"
          visible={isModalVisible}
          onOk={handleStartOver}
          onCancel={() => setIsModalVisible(false)}
        >
          Would you like to play again?
        </Modal>
      )}
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
