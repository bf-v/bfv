import GfycatStore from './GfycatStore';
import { useContext, useEffect, useState } from 'react';
import VideoContext from '../../VideoContext';
import Iframe from '../Iframe';

type GfycatProps = {
  title: string;
  url: URL;
};

const Gfycat = ({ url, title }: GfycatProps) => {
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<unknown | null>(null);
  const gfyId = url.pathname.substring(1);
  const videoContext = useContext(VideoContext);

  useEffect(() => {
    (async () => {
      try {
        setVideoUrl(await GfycatStore.get(gfyId));
      } catch (err) {
        setError(err);
      }
    })();
  }, [gfyId]);

  if (error) {
    return (
      <Iframe src={`https://www.redgifs.com/ifr/${gfyId}`} title={title} />
    );
  }
  return (
    <video
      ref={videoContext}
      autoPlay
      loop
      controls
      src={videoUrl}
      onError={error => setError(error)}
    />
  );
};

export default Gfycat;
