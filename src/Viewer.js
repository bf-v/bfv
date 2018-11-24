import React, { Component } from "react";
import Show from "./Show";
import "./Viewer.css";

function shuffled(inp) {
  const arr = inp.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: shuffled(props.links),
      pos: 0
    };
  }

  next = () => {
    const { pos, q } = this.state;
    this.setState({ pos: Math.min(pos + 1, q.length - 1) });
  };

  prev = () => {
    const { pos } = this.state;
    this.setState({ pos: Math.max(pos - 1, 0) });
  };

  shuffle = () => {
    this.setState({ pos: 0, q: shuffled(this.state.q) });
  };

  render() {
    const { q, pos } = this.state;
    return (
      <div className="viewer-container">
        <div className="button-container">
          <button disabled={pos === 0} onClick={this.prev}>
            Previous
          </button>
          <button onClick={this.shuffle}>Shuffle</button>
          <button disabled={pos === q.length - 1} onClick={this.next}>
            Next
          </button>
        </div>
        <div className="item-container">
          <Show key={q[pos]} link={q[pos]} />
        </div>
      </div>
    );
  }
}
