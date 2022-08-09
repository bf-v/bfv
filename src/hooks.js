import { useEffect } from "react";

export const useVideoKeys = (videoRef, next, prev) => {
  const handleKeys = (e) => {
    const video = videoRef.current;
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      return;
    }

    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        prev();
        return;
      case "ArrowRight":
      case "KeyD":
        next();
        return;
      case "KeyF":
        if (video) {
          if (document.fullscreenElement === video) {
            document.exitFullscreen();
          } else {
            (
              video.requestFullscreen ||
              video.webkitRequestFullScreen ||
              video.mozRequestFullScreen ||
              video.msRequestFullScreen ||
              video.webkitEnterFullScreen ||
              (() => null)
            ).bind(video)();
          }
        }
        return;
      case "Space":
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
    console.log("adding listener");
    window.addEventListener("keydown", handleKeys);
    return () => {
      console.log("removing listener");
      window.removeEventListener("keydown", handleKeys);
    };
    // eslint-disable-next-line
  }, []);
};
