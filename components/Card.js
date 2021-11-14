import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";

function Card({
  id,
  game,
  flipCount,
  setFlipCount,
  indexesOfFlippedCards,
  setIndexesOfFlippedCards,
  letterToBeDisplayed,
  font,
  showFontInfo,
  backgroundColor,
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  useEffect(() => {
    if (
      indexesOfFlippedCards[2] === true &&
      indexesOfFlippedCards.indexOf(id) > -1
    ) {
      setTimeout(() => {
        setIsFlipped((state) => !state);
        setFlipCount(flipCount + 1);
        setIndexesOfFlippedCards([]);
      }, 1000);
    } else if (indexesOfFlippedCards[2] === false) {
      setFlipCount(flipCount + 1);
      setIndexesOfFlippedCards([]);
    }
  }, [indexesOfFlippedCards]);

  const updateFlipStates = () => {
    setIsFlipped((state) => !state);
    setFlipCount(flipCount + 1);
    const newIndexes = [...indexesOfFlippedCards];
    newIndexes.push(id);
    setIndexesOfFlippedCards(newIndexes);
  };

  const handleCardClick = () => {
    if (!game[id].flipped && flipCount % 3 === 0) {
      updateFlipStates();
    } else if (
      flipCount % 3 === 1 &&
      !game[id].flipped &&
      indexesOfFlippedCards.indexOf(id) < 0
    ) {
      updateFlipStates();
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {!isFlipped && (
        <a.div
          className="card-body back"
          style={{
            opacity: opacity.interpolate((o) => 1 - o),
            transform,
          }}
        />
      )}
      {isFlipped && (
        <>
          <a.div
            className="card-body"
            style={{
              opacity,
              transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
              background: backgroundColor,
              fontFamily: font,
            }}
          >
            {letterToBeDisplayed}
            {showFontInfo && <div className="font-info">{font}</div>}
          </a.div>
        </>
      )}
    </div>
  );
}

export default Card;
