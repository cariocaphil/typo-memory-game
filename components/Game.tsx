import React, { useState, useEffect } from "react";
import Card from "./Card";
import dynamic from "next/dynamic";
import {
  createShuffledBoard,
  isGameFinished,
  resolveFlippedPair,
} from "../utils/gameLogic";

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
}) {
  const [game, setGame] = useState([]);
  const [indexesOfFlippedCards, setIndexesOfFlippedCards] = useState<number[]>(
    []
  );
  const [turnPhase, setTurnPhase] = useState("idle");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setGame(createShuffledBoard(options, fonts));
  }, []);

  useEffect(() => {
    if (isGameFinished(game)) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 500);
    }
  }, [game]);

  useEffect(() => {
    if (turnPhase !== "resolving") {
      return;
    }

    const resolvedPair = resolveFlippedPair(game, indexesOfFlippedCards);
    if (!resolvedPair) {
      return;
    }

    if (resolvedPair.updatedGame !== game) {
      setGame(resolvedPair.updatedGame);
    }

    if (resolvedPair.isMatch) {
      setIndexesOfFlippedCards([]);
      setTurnPhase("idle");
      return;
    }

    const timeoutId = setTimeout(() => {
      setIndexesOfFlippedCards([]);
      setTurnPhase("idle");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [indexesOfFlippedCards, game, turnPhase]);

  const handleFlipCard = (cardIndex) => {
    if (turnPhase === "resolving" || game[cardIndex]?.flipped) {
      return;
    }

    if (turnPhase === "idle") {
      setIndexesOfFlippedCards([cardIndex]);
      setTurnPhase("oneFlipped");
      return;
    }

    if (
      turnPhase === "oneFlipped" &&
      indexesOfFlippedCards[0] !== cardIndex
    ) {
      setIndexesOfFlippedCards([indexesOfFlippedCards[0], cardIndex]);
      setTurnPhase("resolving");
    }
  };

  return (
    <div className="cards-section">
      {game.map((card, index) => (
        <div key={index}>
          <Card
            id={index}
            game={game}
            indexesOfFlippedCards={indexesOfFlippedCards}
            handleFlipCard={handleFlipCard}
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
