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
  const [flipCount, setFlipCount] = useState(0);
  const [indexesOfFlippedCards, setIndexesOfFlippedCards] = useState([]);
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
    const resolvedPair = resolveFlippedPair(game, indexesOfFlippedCards);
    if (!resolvedPair) {
      return;
    }

    if (resolvedPair.updatedGame !== game) {
      setGame(resolvedPair.updatedGame);
    }
    setIndexesOfFlippedCards(resolvedPair.updatedIndexes);
  }, [indexesOfFlippedCards, game]);

  return (
    <div className="cards-section">
      {game.map((card, index) => (
        <div key={index}>
          <Card
            id={index}
            game={game}
            flipCount={flipCount}
            setFlipCount={setFlipCount}
            indexesOfFlippedCards={indexesOfFlippedCards}
            setIndexesOfFlippedCards={setIndexesOfFlippedCards}
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
