import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);
  const [ids, setIDs] = useState<string[]>([]);
  const [noti, setNoti] = useState<string>("");

  const generateID = () => {
    const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const suffix = "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16))
      .toLowerCase();
    return `${timestamp}${suffix}`;
  };

  const generateIDs = (count: number) => {
    if (!count) {
      setIDs([]);
      setNotiText("Please input the number!!!");
      return;
    }

    const ids = [];
    for (let index = 0; index < count; index++) {
      ids.push(generateID());
    }
    setIDs(ids);
  };

  const renderIDs = () => {
    if (!ids.length) {
      return "";
    }

    let idsStr = `Array(${ids.length}): [`;
    if (ids.length === 1) {
      idsStr += ` ${ids[0]} ]`;
      return idsStr;
    }
    ids.forEach((id) => {
      idsStr += "\n\t" + id + ",";
    });

    idsStr += "\n]";
    return idsStr;
  };

  const setNotiText = (text: string) => {
    setTimeout(() => {
      setNoti("");
    }, 1500);
    setNoti(text);
  };

  const copyClipboard = () => {
    try {
      const el = document.createElement("textarea");
      el.value = ids.join("\n");
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setNotiText("Copied!!!");
    } catch (error) {
      setNotiText(String(error) || "Copied failed!!!");
    }
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="container">
        <div className="input-container">
          <input
            type="number"
            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
          />
          <div className="button-group">
            <button
              className="create-button"
              onClick={() => generateIDs(count)}
            >
              Generate IDs
            </button>
            {!!ids.length && <button className="copy-button" onClick={() => copyClipboard()}>
              Copy to Clipboard
            </button>}
          </div>
          {!!noti && <p className="noti-text">{noti}</p>}
        </div>
        <div className="result-container">
          <textarea id="ids-result" value={renderIDs()} />
        </div>
      </div>
    </div>
  );
}

export default App;
