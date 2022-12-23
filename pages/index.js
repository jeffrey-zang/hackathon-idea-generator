import Head from "next/head";
import { useState, useRef } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [themeInput, setthemeInput] = useState("");
  const [result, setResult] = useState();
  const ref = useRef(null);
  let colours = ['EE', 'DD', 'FF']

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: themeInput }),
    });
    const data = await response.json();

    ref.current.style.backgroundColor = `#${colours[Math.floor(Math.random() * colours.length)]}${colours[Math.floor(Math.random() * colours.length)]}${colours[Math.floor(Math.random() * colours.length)]}`;
    setResult(data.result);
    setthemeInput("");
  }

  return (
    <div>
      <Head>
        <title>Hackathon Project Idea Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Give me an idea based on...</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="theme"
            placeholder="Enter a theme"
            value={themeInput}
            onChange={(e) => setthemeInput(e.target.value)}
          />
          <input type="submit" value="Generate idea" />
        </form>
        <div className={styles.result} ref={ref}>
          <h1>Your idea is</h1>
          {result}
        </div>
      </main>
    </div>
  );
}
