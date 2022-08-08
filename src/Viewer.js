import React, { Component } from "react";
import Show from "./show/Show";
import "./Viewer.css";

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = { pos: 0, list: Object.keys(props.links)[0] };
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeys);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeys);
  }

  handleKeys = e => {
    if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
      return;
    }
    const video = document.querySelector(".item-container > video");

    switch (e.code) {
      case "ArrowLeft":
      case "KeyA":
        return this.prev();
      case "ArrowRight":
      case "KeyD":
        return this.next();
      case "KeyF":
        if (video) {
          (
            video.requestFullscreen ||
            video.webkitRequestFullScreen ||
            video.mozRequestFullScreen ||
            video.msRequestFullScreen ||
            video.webkitEnterFullScreen ||
            (() => null)
          ).bind(video)();
        }
        return;
      case "Space":
        if (video) {
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

  next = () => {
    this.setState(({ pos, list }, { links }) => ({
      pos: Math.min(pos + 1, links[list].length - 1)
    }));
  };

  prev = () => {
    this.setState(({ pos }) => ({
      pos: Math.max(pos - 1, 0)
    }));
  };

  render() {
    const { pos, list } = this.state;
    const { links } = this.props;
    return (
      <div className="viewer-container">
        <div className="button-container">
          <button disabled={pos === 0} onClick={this.prev}>
            Previous
          </button>
          <select
            value={list}
            onChange={e => this.setState({ list: e.target.value })}
          >
            {Object.keys(links).map((l, index) => (
              <option key={index} value={l}>{l}</option>
            ))}
          </select>
          <button disabled={pos === links[list].length - 1} onClick={this.next}>
            Next
          </button>
        </div>
        <Show link={links[list][pos]} />
      </div>
    );
  }
}
