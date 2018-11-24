import React, { Component } from "react";
import Show from "./Show";

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
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch"
        }}
      >
        <div
          style={{
            flexShrink: 0,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            padding: "10px 0",
            height: 50
          }}
        >
          <button disabled={this.state.pos === 0} onClick={this.prev}>
            &lt;
          </button>
          <button onClick={this.shuffle}>shuffle</button>
          <button
            disabled={this.state.pos === this.state.q.length - 1}
            onClick={this.next}
          >
            &gt;
          </button>
        </div>
        <div style={{ height: "calc(100vh - 50px)" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxHeight: "100%",
              height: "100%"
            }}
          >
            <Show link={this.state.q[this.state.pos]} />
          </div>
        </div>
      </div>
    );
  }
}
