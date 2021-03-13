import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import List from "../components/list";
import axios from "axios";

export default function Home() {
  const [flag, setFlag] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const regx = new RegExp(
    "^((https?|ftp|smtp)://)?(www.)[a-z0-9]+.[a-z]+(/[a-zA-Z0-9#]+/?)*$"
  );

  const submit = async (e) => {
    e.preventDefault();
    if (!regx.test(longUrl)) {
      alert("Invalid URL");
    }
    const body = {
      url: longUrl,
    };

    const res = await axios.post(`http://localhost:5000/api/client`, body);
    setFlag(true);
    setShortUrl(`http://localhost:5000/api/${res.data.surl}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Shorten</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.heading}>
          <span className={styles.golden}>Shorten</span> your URL
        </h1>
        <form onSubmit={submit} className={styles.form}>
          <input
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Put your long URL here"
          />
          <button onClick={submit}>Magic</button>
        </form>
        <List flag={flag} url={shortUrl} />
      </main>
    </div>
  );
}
