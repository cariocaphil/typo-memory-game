import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout.js";

export default function ThankYou() {
  return (
    <>
      <Layout>
        <Head>
          <title>Credits</title>
        </Head>
        <h1>credits</h1>
        <p>made by cariocaphil</p>
        <ul>
          <li>
            inspiration:{" "}
            <Link href="https://www.hustwit.com/helvetica">Helvetica</Link> by
            Gary Hustwit
          </li>
          <li>
            design{" "}
            <Link href="https://www.1001freedownloads.com/free-clipart/card-backs-grid-blue">
              card back grid blue
            </Link>
            : by <Link href="http://nicubunu.ro/">Nicubunu</Link>
          </li>
          <li>
            favicon:{" "}
            <Link href="https://favicon.io/favicon-generator/">
              Favicon Generator
            </Link>
          </li>
        </ul>
        <h3>
          <Link href="/">
            <a>back to game</a>
          </Link>
        </h3>
      </Layout>
    </>
  );
}
