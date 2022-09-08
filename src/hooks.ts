import { MutableRefObject, useEffect } from 'react';

type SimpleFn = () => unknown;

export const useVideoKeys = (
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  prev: SimpleFn,
  next: SimpleFn,
) => {
  const handleKeys = (e: KeyboardEvent) => {
    const video = videoRef.current;
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      return;
    }

    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA': {
        prev();
        return;
      }
      case 'ArrowRight':
      case 'KeyD': {
        next();
        return;
      }
      case 'Space': {
        if (video && document.activeElement !== video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
        return;
      }
      default: {
        return;
      }
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

export const useFullscreenKey = () => {
  let toggleFullscreen: SimpleFn | undefined = undefined;
  if (typeof document.body.requestFullscreen === 'function') {
    toggleFullscreen = () => {
      if (document.body === document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        document.body.requestFullscreen();
      }
    };
  }

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
        return;
      }

      if (e.code === 'KeyF' && toggleFullscreen) {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => {
      window.removeEventListener('keydown', handleKeys);
    };
  }, []);

  return toggleFullscreen;
};

export const useSwipeKeys = (onLeftSwipe: SimpleFn, onRightSwipe: SimpleFn) => {
  useEffect(() => {
    let touchstartX = 0;
    let touchendX = 0;

    const checkDirection = () => {
      const threshold = 20;
      if (touchstartX - touchendX >= threshold) {
        onLeftSwipe();
      }
      if (touchendX - touchstartX >= threshold) {
        onRightSwipe();
      }
    };

    const touchStartListener = (e: TouchEvent) => {
      touchstartX = e.changedTouches[0].screenX;
    };

    const touchEndListener = (e: TouchEvent) => {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    };

    document.addEventListener('touchstart', touchStartListener);
    document.addEventListener('touchend', touchEndListener);
    return () => {
      document.removeEventListener('touchstart', touchStartListener);
      document.removeEventListener('touchend', touchEndListener);
    };
  }, [onLeftSwipe, onRightSwipe]);
};
