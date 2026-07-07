import React, { useMemo, useState } from "react";
import Game from "../components/Game";
import Layout from "../components/Layout";
import Panel from "../components/Panel";
import TitleBar from "../components/TitleBar";
import type { GetStaticProps } from "next";

import {
  BACKGROUND_COLOR,
  OPTIONS_NUMBER,
  UPPER_CASE,
  LOWER_CASE,
  INITIAL_FONTS_ARRAY,
} from "../utils/constants";
import { shuffleArray } from "../utils/utils";
import type { HomePageProps } from "../types/pages";
import styles from "./index.module.css";

function createLetterArray(letterCase: number): string[] {
  return new Array(26)
    .fill(1)
    .map((_, i) => String.fromCharCode(letterCase + i));
}

export default function App({ fonts }: HomePageProps) {
  const [gameKey, setGameKey] = useState<number>(0);
  const [letterCase, setLetterCase] = useState<number>(LOWER_CASE);
  const letters = useMemo(() => createLetterArray(letterCase), [letterCase]);

  const [showFontInfo, setShowFontInfo] = useState<boolean>(false);
  const [letterToBeDisplayed, setLetterToBeDisplayed] = useState<string>(
    () => createLetterArray(LOWER_CASE)[21]
  );
  const [alwaysDifferentLetter, setAlwaysDifferentLetter] =
    useState<boolean>(true);

  const backgroundColor = BACKGROUND_COLOR;

  const handleStartOver = () => {
    setGameKey((key) => key + 1);
  };

  const handleChangeLetter = () => {
    setAlwaysDifferentLetter(false);
    const randomKey = Math.floor(Math.random() * letters.length);
    setLetterToBeDisplayed(letters[randomKey]);
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

  const handleLetterVariation = (value: boolean) => {
    setAlwaysDifferentLetter(value);
  };

  const handleFontNameDisplay = (value: boolean) => {
    setShowFontInfo(value);
  };

  return (
    <Layout>
      <div className={styles.panelContainer}>
        <Panel
          alwaysDifferentLetter={alwaysDifferentLetter}
          showFontInfo={showFontInfo}
          handleStartOver={handleStartOver}
          handleChangeLetter={handleChangeLetter}
          handleChangeLetterCase={handleChangeLetterCase}
          handleFontNameDisplay={handleFontNameDisplay}
          handleLetterVariation={handleLetterVariation}
        />
        <TitleBar />
      </div>
      <Game
        key={gameKey}
        options={OPTIONS_NUMBER}
        letterToBeDisplayed={letterToBeDisplayed}
        letters={letters}
        fonts={fonts}
        showFontInfo={showFontInfo}
        alwaysDifferentLetter={alwaysDifferentLetter}
        backgroundColor={backgroundColor}
        handleStartOver={handleStartOver}
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const initialFontsArray = INITIAL_FONTS_ARRAY;
  const shuffledFontList = shuffleArray(initialFontsArray);
  const fontsForGame = shuffledFontList.slice(0, 20);

  return {
    props: {
      fonts: fontsForGame,
    },
  };
};
