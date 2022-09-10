import { MutableRefObject, useEffect } from 'react';

type SimpleFn = () => unknown;

const seekTime = 5;

export const useVideoKeys = (
  videoRef: MutableRefObject<HTMLVideoElement | null>,
  prev: SimpleFn,
  next: SimpleFn,
): void => {
  const handleKeys = (e: KeyboardEvent) => {
    const video = videoRef.current;
    if (e.ctrlKey || e.altKey || e.metaKey) {
      return;
    }

    switch (e.code) {
      case 'ArrowLeft':
      case 'KeyA': {
        if (e.shiftKey) {
          if (video?.currentTime) {
            video.currentTime -= seekTime;
          }
        } else {
          prev();
        }
        return;
      }
      case 'ArrowRight':
      case 'KeyD': {
        if (e.shiftKey) {
          if (video?.currentTime) {
            video.currentTime += seekTime;
          }
        } else {
          next();
        }
        return;
      }
      case 'Space': {
        if (e.shiftKey) {
          return;
        }
        if (video && document.activeElement !== video) {
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
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
