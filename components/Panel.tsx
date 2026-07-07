import React from "react";
import dynamic from "next/dynamic";
import type { PanelProps } from "../types/game";
import styles from "./Panel.module.css";

const Button = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

const Switch = dynamic(() => import("antd/lib/switch"), {
  ssr: false,
});

function Panel({
  alwaysDifferentLetter,
  showFontInfo,
  handleStartOver,
  handleChangeLetter,
  handleChangeLetterCase,
  handleLetterVariation,
  handleFontNameDisplay,
}: PanelProps) {
  return (
    <section>
      <Button onClick={handleStartOver}>Start Again</Button>
      <Button onClick={handleChangeLetter}>Change Letter</Button>
      <Button onClick={handleChangeLetterCase}>Upper/Lower Case</Button>
      <div className={styles.switches}>
        <label htmlFor="switchLetter">Show same letter for each card</label>
        <Switch
          id="switchLetter"
          checked={!alwaysDifferentLetter}
          onChange={(checked) => handleLetterVariation(!checked)}
          title="switch Letter"
        />
        <label htmlFor="switchFontName">Show Font Name</label>
        <Switch
          id="switchFontName"
          checked={showFontInfo}
          onChange={handleFontNameDisplay}
          title="switch FontName"
        />
      </div>
    </section>
  );
}

export default Panel;
