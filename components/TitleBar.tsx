import Link from "next/link";

export default function TitleBar() {
  return (
    <div className="title-section">
      <h1>TypoMemory</h1>
      <p>a font memory game</p>
      <div className="credits-section">
        <Link href="/credits/thank-you">
          <a>credits</a>
        </Link>
      </div>
    </div>
  );
}
