import { MutableRefObject, useEffect } from 'react';

type SimpleFn = () => unknown;

export const useVideoKeys = (
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  next: SimpleFn,
  prev: SimpleFn,
) => {
  const handleKeys = (e: KeyboardEvent) => {
    const video = videoRef.current;
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      return;
    }

    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        prev();
        return;
      case 'ArrowRight':
      case 'KeyD':
        next();
        return;
      case 'KeyF':
        if (video) {
          if (document.fullscreenElement === video) {
            document.exitFullscreen();
          } else {
            video.requestFullscreen();
          }
        }
        return;
      case 'Space':
        if (video && document.activeElement !== video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeys);
    return () => {
      window.removeEventListener('keydown', handleKeys);
    };
    // eslint-disable-next-line
  }, []);
};
