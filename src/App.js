import React, { useState, useEffect } from "react";
import Layout from "./Component/Layout";
import "./styles.css";
import useLocalStorage from "./hooks/useLocalStorage";
//import Layout from "./Component/Layout";
export default function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
    <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
    </html>
  `
      );
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Layout
          language="xml"
          displayTitle="HTML"
          value={html}
          onChange={setHtml}
        />
        <Layout
          language="css"
          displayTitle="CSS"
          value={css}
          onChange={setCss}
        />
        <Layout
          language="javascript"
          displayTitle="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}
