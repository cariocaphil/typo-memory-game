import React from "react";
import { useSpring, animated as a } from "react-spring";
import { useMemoryGameContext } from "../context/MemoryGameContext";
import type { CardProps } from "../types/game";

function Card({
  id,
  letterToBeDisplayed,
  font,
  showFontInfo,
  backgroundColor,
}: CardProps) {
  const {
    state: { game, indexesOfFlippedCards, turnPhase },
    actions: { flipCard },
  } = useMemoryGameContext();

  const isFlipped =
    Boolean(game[id]?.flipped) || indexesOfFlippedCards.includes(id);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleCardClick = () => {
    if (turnPhase === "resolving") {
      return;
    }
    flipCard(id);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {!isFlipped && (
        <a.div
          className="card-body back"
          style={{
            opacity: opacity.interpolate((o: number) => 1 - o),
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
