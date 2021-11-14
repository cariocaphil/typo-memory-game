import React, { useState, useEffect } from "react";
import Card from "./Card";
import dynamic from 'next/dynamic';
import { shuffleArray } from "../utils/utils";

const Modal = dynamic(() => import('antd/lib/modal'), {
  ssr: false
})

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
    const newGame = [];
    for (let i = 0; i < options / 2; i++) {
      const optionA = {
        id: i,
        fontId: "font" + i,
        flipped: false,
        font: fonts && fonts[i],
      };
      const optionB = {
        id: i + 1,
        fontId: "font" + i,
        flipped: false,
        font: fonts && fonts[i],
      };

      newGame.push(optionA);
      newGame.push(optionB);
    }

    const shuffledGame = shuffleArray(newGame);
    setGame(shuffledGame);
  }, []);

  useEffect(() => {
    const finished = !game.some((card) => !card.flipped);
    if (finished && game.length > 0) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 500);
    }
  }, [game]);

  if (indexesOfFlippedCards.length === 2) {
    const match =
      game[indexesOfFlippedCards[0]].fontId ===
      game[indexesOfFlippedCards[1]].fontId;

    if (match) {
      const newGame = [...game];
      newGame[indexesOfFlippedCards[0]].flipped = true;
      newGame[indexesOfFlippedCards[1]].flipped = true;
      setGame(newGame);

      const newIndexes = [...indexesOfFlippedCards];
      newIndexes.push(false);
      setIndexesOfFlippedCards(newIndexes);
    } else {
      const newIndexes = [...indexesOfFlippedCards];
      newIndexes.push(true);
      setIndexesOfFlippedCards(newIndexes);
    }
  }

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
          {isModalVisible && <Modal
            title="Well Done!"
            visible={isModalVisible}
            onOk={handleStartOver}
            onCancel={() => setIsModalVisible(false)}
          >
            Would you like to play again?
          </Modal>}
        </div>
      ))}
    </div>
  );
}

export default Game;
