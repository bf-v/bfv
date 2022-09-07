import { createContext, MutableRefObject } from 'react';

const VideoContext = createContext<MutableRefObject<HTMLVideoElement | null> | null>(
  null,
);

export default VideoContext;
