import React, { useState, useEffect } from "react";
import Card from "./Card";
import dynamic from "next/dynamic";
import { isGameFinished } from "../utils/gameLogic";
import { useMemoryGame } from "../hooks/useMemoryGame";
import type { GameProps } from "../types/game";

const Modal = dynamic(() => import("antd/lib/modal"), {
  ssr: false,
});

function Game({
  options,
  letterToBeDisplayed,
  showFontInfo,
  alwaysDifferentLetter,
  fonts,
  backgroundColor,
  letters,
  handleStartOver,
}: GameProps) {
  const { game, indexesOfFlippedCards, turnPhase, flipCard } = useMemoryGame(
    options,
    fonts
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isGameFinished(game)) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 500);
    }
  }, [game]);

  return (
    <div className="cards-section">
      {game.map((card, index) => (
        <div key={index}>
          <Card
            id={index}
            game={game}
            indexesOfFlippedCards={indexesOfFlippedCards}
            handleFlipCard={flipCard}
            turnPhase={turnPhase}
            letterToBeDisplayed={
              alwaysDifferentLetter ? letters[index] : letterToBeDisplayed
            }
            font={card.font}
            showFontInfo={showFontInfo}
            backgroundColor={backgroundColor}
          />
        </div>
      ))}
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
    </div>
  );
}

export default Game;
