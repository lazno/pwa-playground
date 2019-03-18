import React, { useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Cam from "../components/Cam";
import "./capture.scss";

const Capture = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const doCapture = uri => {
    window.Tesseract.recognize(uri, { lang: "deu" })
      .progress(message => setText(message.status))
      .then(result => {
        setText(result.text);
        setUrl(uri);
      })
      .catch(err => setText(err));
  };

  return (
    <div>
      <nav>
      <Link href="/index">
        <a>Index page</a>
      </Link>
      </nav>
      <main>
      {text ? <div>{text}<img src={url}/></div> : <Cam onTakePhoto={uri => doCapture(uri)} />}

      <script src="https://cdn.jsdelivr.net/gh/naptha/tesseract.js@v1.0.14/dist/tesseract.min.js" />
      </main>
    </div>
  );
};

export default Capture;
