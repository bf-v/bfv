import { useState } from "react";
import { parse } from "papaparse";
import "./ViewerWithLinks.css";
import Viewer from "./Viewer";

function shuffled(inp) {
  const arr = inp.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const ViewerWithLinks = () => {
  const [fileLinks, setFileLinks] = useState({});
  const [shuffle, setShuffle] = useState(true);

  const handleFile = (e) => {
    for (let file of e.target.files) {
      parse(file, {
        complete: (res) =>
          setFileLinks((oldFileLinks) =>
            Object.keys(oldFileLinks).reduce(
              (acc, curr) => {
                if (!(curr in acc)) acc[curr] = [];
                acc[curr].push(...oldFileLinks[curr]);
                return acc;
              },
              res.data.reduce((acc, [list, src]) => {
                if (src && src.startsWith("http")) {
                  if (!(list in acc)) acc[list] = [];
                  acc[list].push(src);
                }
                return acc;
              }, {})
            )
          ),
      });
    }
  };

  if (Object.keys(fileLinks).length === 0) {
    return (
      <div id="viewer-with-links">
        <h1>BFV</h1>
        <button
          id="enable-shuffling"
          className={shuffle ? "enabled" : "disabled"}
          onClick={() => setShuffle((s) => !s)}
        >
          Shuffling {shuffle ? "enabled" : "disabled"}
        </button>
        <div className="file-input-container">
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={handleFile}
            multiple
          />
          <label htmlFor="file-input">Choose a file</label>
        </div>
      </div>
    );
  }
  return (
    <Viewer
      links={Object.keys(fileLinks).reduce((acc, file) => {
        acc[file] = shuffle ? shuffled(fileLinks[file]) : fileLinks[file];
        return acc;
      }, {})}
      resetLinks={() => setFileLinks({})}
    />
  );
};

export default ViewerWithLinks;
