import React from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { useMemoryGameContext } from "../context/MemoryGameContext";
import { getGameFontFamily } from "../utils/fonts";
import type { CardProps } from "../types/game";
import styles from "./Card.module.css";

function Card({
  index,
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
    Boolean(game[index]?.flipped) || indexesOfFlippedCards.includes(index);

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleCardClick = () => {
    if (turnPhase === "resolving") {
      return;
    }
    flipCard(index);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {!isFlipped && (
        <animated.div
          className={`${styles.cardBody} ${styles.back}`}
          style={{
            opacity: to(opacity, (value) => 1 - value),
            transform,
          }}
        />
      )}
      {isFlipped && (
        <animated.div
          className={styles.cardBody}
          style={{
            opacity,
            transform: to(transform, (value) => `${value} rotateX(180deg)`),
            background: backgroundColor,
            fontFamily: getGameFontFamily(font),
          }}
        >
          {letterToBeDisplayed}
          {showFontInfo && <div className={styles.fontInfo}>{font}</div>}
        </animated.div>
      )}
    </div>
  );
}

export default Card;
