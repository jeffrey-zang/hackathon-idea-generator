import Head from "next/head";
import { useState, useRef } from "react";
import styles from "./index.module.css";

import Typewriter from "typewriter-effect";

export default function Home() {
  const [themeInput, setthemeInput] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  let colours = ['EE', 'DD', 'FF']

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: themeInput }),
    });
    const data = await response.json();

    ref.current.style.backgroundColor = `#${colours[Math.floor(Math.random() * colours.length)]}${colours[Math.floor(Math.random() * colours.length)]}${colours[Math.floor(Math.random() * colours.length)]}`;
    setResult(data.summary);
    setthemeInput("");
    setLoading(false);
  }

  const themes = ['health', 'farming', 'food', 'clocks', 'among us', 'time', 'medicine', 'blockchain', 'machine learning', 'jam', 'animals', 'charities', 'monkeys', 'turtles', 'productivity', 'school', 'business', 'jobs and internships', 'fitness', 'book reviewing', 'golf in space', 'moles', 'cooking and recipes', 'smart shopping']

  return (
    <div>
      <Head>
        <title>Hackathon Project Idea Generator</title>
        <link rel="icon" href="/bulb.png" />
      </Head>

      <main className={styles.main}>
        <img src="/bulb.png" className={styles.icon} />
        <h3>
        Give me an idea based on...
        <Typewriter   
          options={{
            strings: themes,
            autoStart: true,
            loop: true,
          }}
        />
        </h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="theme"
            placeholder="Enter a theme"
            value={themeInput}
            onChange={(e) => setthemeInput(e.target.value)}
          />
          <button type="submit">{(loading) ? "Loading..." : "Generate Idea"}</button>
        </form>
        <div className={styles.result} ref={ref}>
          <h1>Your idea is</h1>
          {(result == '' || !result) ? "A crowdsourcing tool that allows readers to voluntarily rate and review books they've read. The ratings could be used to generate reading recommendations for other readers, and the reviews could be used to improve the quality and accuracy of book ratings and reviews." : result}
        </div>
        <div className={styles.footer}>
          <p>Powered by
            <img src='/cohere.png' className={styles.openai} />
          </p>
          <a href='https://github.com/jeffrey-zang/hackathon-idea-generator'>Source</a>
        </div>
      </main>
    </div>
  );
}
