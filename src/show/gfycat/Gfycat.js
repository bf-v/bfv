import GfycatStore from "./GfycatStore";
import { useContext, useEffect, useState } from "react";
import VideoContext from "../../VideoContext";

const Gfycat = ({ url }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const gfyId = url.pathname.substring(1);
  const videoContext = useContext(VideoContext);

  useEffect(() => {
    (async () => {
      try {
        setVideoUrl(await GfycatStore.get(gfyId));
      } catch (err) {
        console.error(err);
        setError(err);
      }
    })();
  }, [gfyId]);

  if (error) {
    return (
      <div className="error">
        <div className="error-message">
          Error loading Gfycat. You can{" "}
          <a target="_blank" rel="noopener noreferrer" href={url}>
            try the direct link
          </a>
          .
        </div>
      </div>
    );
  }
  return (
    <video
      ref={videoContext}
      autoPlay
      loop
      controls
      src={videoUrl}
      onError={(error) => setError(error)}
    />
  );
};

export default Gfycat;
