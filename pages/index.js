import React, { useState, useEffect } from "react";
import Game from "../components/Game.js";
import Panel from "../components/Panel.js";
import TitleBar from "../components/TitleBar.js";

import {
  BACKGROUND_COLOR,
  OPTIONS_NUMBER,
  UPPER_CASE,
  LOWER_CASE,
  INITIAL_FONTS_ARRAY,
} from "../utils/constants.js";
import { shuffleArray } from "../utils/utils.js";
import { Button } from "antd";

export default function App(props) {
  const [isReadyToStart, setIsReadyToStart] = useState(true);
  const [options, setOptions] = useState(OPTIONS_NUMBER);
  const [letterCase, setLetterCase] = useState(LOWER_CASE);
  const initialLetters = new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(letterCase + i));
  const [letters, setLetters] = useState(initialLetters);

  const [showFontInfo, setShowFontInfo] = useState(false);
  const [letterToBeDisplayed, setLetterToBeDisplayed] = useState(letters[21]);
  const [alwaysDifferentLetter, setAlwaysDifferentLetter] = useState(true);

  const backgroundColor = BACKGROUND_COLOR;
  const randomnKey = Math.floor(Math.random() * letters.length);
  const letterRandomn = letters[randomnKey];

  useEffect(() => {
    const updatedLetters = new Array(26)
      .fill(1)
      .map((_, i) => String.fromCharCode(letterCase + i));
    setLetters(updatedLetters);
  }, [letterCase]);

  const handleStart = () => {
    setIsReadyToStart(true);
  };

  // handlers for panel
  const handleStartOver = () => {
    const prevOptions = options;
    setOptions(null);
    setTimeout(() => {
      setOptions(prevOptions);
    }, 12);
  };

  const handleChangeLetter = () => {
    setAlwaysDifferentLetter(false);
    setLetterToBeDisplayed(letterRandomn);
  };

  const handleChangeLetterCase = () => {
    let updatedLetter = "";
    if (letterCase === LOWER_CASE) {
      setLetterCase(UPPER_CASE);
      updatedLetter = letterToBeDisplayed.toUpperCase();
    } else {
      setLetterCase(LOWER_CASE);
      updatedLetter = letterToBeDisplayed.toLowerCase();
    }
    setLetterToBeDisplayed(updatedLetter);
  };

  const handleLetterVariation = () => {
    setAlwaysDifferentLetter((value) => !value);
  };

  const handleFontNameDisplay = () => {
    setShowFontInfo((value) => !value);
  };

  return (
    <>
      <div>
        <div className="panel-container">
          {isReadyToStart && (
            <Panel
              handleStartOver={handleStartOver}
              handleChangeLetter={handleChangeLetter}
              handleChangeLetterCase={handleChangeLetterCase}
              handleFontNameDisplay={handleFontNameDisplay}
              handleLetterVariation={handleLetterVariation}
            />
          )}
          <TitleBar />
        </div>
        {isReadyToStart ? (
          options && (
            <Game
              options={options}
              setOptions={setOptions}
              letterToBeDisplayed={letterToBeDisplayed}
              letters={letters}
              fonts={props.fonts}
              showFontInfo={showFontInfo}
              alwaysDifferentLetter={alwaysDifferentLetter}
              backgroundColor={backgroundColor}
              handleStartOver={handleStartOver}
            />
          )
        ) : (
          <div className="start-section">
            <Button type="primary" size="large" onClick={handleStart}>
              Start Game
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const initialFontsArray = INITIAL_FONTS_ARRAY;
  const shuffledFontList = shuffleArray(initialFontsArray);
  const fontsForGame = shuffledFontList.slice(0, 20);

  return {
    props: {
      fonts: fontsForGame,
    },
  };
}
