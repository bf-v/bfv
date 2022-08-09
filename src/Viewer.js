import { useRef, useState } from "react";
import Show from "./show/Show";
import "./Viewer.css";
import { useVideoKeys } from "./hooks";
import VideoContext from "./VideoContext";

const Viewer = ({ links, resetLinks }) => {
  const [pos, setPos] = useState(0);
  const [list, setList] = useState(Object.keys(links)[0]);
  const videoRef = useRef();

  const next = () => {
    setPos((p) => Math.min(p + 1, links[list].length - 1));
  };

  const prev = () => {
    setPos((p) => Math.max(p - 1, 0));
  };

  useVideoKeys(videoRef, next, prev);

  return (
    <div className="viewer-container">
      <div className="button-container">
        <button disabled={pos === 0} onClick={prev}>
          Previous
        </button>
        <select value={list} onChange={(e) => setList(e.target.value)}>
          {Object.keys(links).map((l, index) => (
            <option key={index} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button disabled={pos === links[list].length - 1} onClick={next}>
          Next
        </button>
        <button
          id="reset-button"
          type="button"
          onClick={resetLinks}
          title="Start over"
        >
          X
        </button>
      </div>
      <VideoContext.Provider value={videoRef}>
        <Show link={links[list][pos]} />
      </VideoContext.Provider>
    </div>
  );
};

export default Viewer;
