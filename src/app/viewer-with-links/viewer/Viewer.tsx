import { useRef, useState } from 'react';
import Show from './show/Show';
import './Viewer.css';
import { useFullscreenKey, useSwipeKeys, useVideoKeys } from '../../../hooks';
import VideoContext from './VideoContext';
import { FileLinks } from '../ViewerWithLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faLink,
  faMaximize,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
  links: FileLinks;
  resetLinks: () => void;
};

const Viewer = ({ links, resetLinks }: Props) => {
  const [pos, setPos] = useState(0);
  const [list, setList] = useState(Object.keys(links)[0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const next = () => {
    setPos(p => Math.min(p + 1, links[list].length - 1));
  };

  const prev = () => {
    setPos(p => Math.max(p - 1, 0));
  };

  useVideoKeys(videoRef, prev, next);
  useSwipeKeys(next, prev);
  const toggleFullscreen = useFullscreenKey();

  return (
    <div className="viewer-container">
      <div className="button-container">
        <div id="absolute-left">
          {toggleFullscreen && (
            <button
              id="maximize-button"
              className="btn icon"
              type="button"
              onClick={toggleFullscreen}
              title="Enter/exit fullscreen"
            >
              <FontAwesomeIcon icon={faMaximize} />
            </button>
          )}
          <a
            id="source-link"
            className="btn icon"
            href={links[list][pos]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLink} />
          </a>
        </div>
        <button
          type="button"
          className="btn icon"
          disabled={pos === 0}
          onClick={prev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <select
          className="btn"
          value={list}
          onChange={e => setList(e.target.value)}
        >
          {Object.keys(links).map((l, index) => (
            <option key={index} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="btn icon"
          disabled={pos === links[list].length - 1}
          onClick={next}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <div id="absolute-right">
          <button
            id="reset-button"
            className="btn icon"
            type="button"
            onClick={resetLinks}
            title="Start over"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      <VideoContext.Provider value={videoRef}>
        <Show link={links[list][pos]} />
      </VideoContext.Provider>
    </div>
  );
};

export default Viewer;
