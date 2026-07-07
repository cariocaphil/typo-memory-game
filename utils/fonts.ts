import {
  East_Sea_Dokdo,
  Mansalva,
  Montserrat,
  Redressed,
  Roboto,
  Xanh_Mono,
} from "next/font/google";

const mansalva = Mansalva({ weight: "400", subsets: ["latin"] });
const xanhMono = Xanh_Mono({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "100", subsets: ["latin"] });
const redressed = Redressed({ weight: "400", subsets: ["latin"] });
const eastSeaDokdo = East_Sea_Dokdo({ weight: "400", subsets: ["latin"] });
const montserrat = Montserrat({ weight: "100", subsets: ["latin"] });

export const GAME_FONTS = {
  Mansalva: mansalva,
  "Xanh Mono": xanhMono,
  Roboto: roboto,
  Redressed: redressed,
  "East Sea Dokdo": eastSeaDokdo,
  Montserrat: montserrat,
} as const;

export const INITIAL_FONTS_ARRAY = Object.keys(GAME_FONTS);

export const gameFontClassNames = Object.values(GAME_FONTS)
  .map((font) => font.className)
  .join(" ");

export function getGameFontFamily(fontName: string): string {
  return (
    GAME_FONTS[fontName as keyof typeof GAME_FONTS]?.style.fontFamily ??
    fontName
  );
}
