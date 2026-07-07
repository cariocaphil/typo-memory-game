import "../styles/globals.css";
import type { AppProps } from "next/app";
import { gameFontClassNames } from "../utils/fonts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={gameFontClassNames}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
