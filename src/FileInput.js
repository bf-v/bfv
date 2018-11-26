import React, { Component } from "react";
import "./FileInput.css";

export default class FileInput extends Component {
  state = { shuffle: true };

  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="file-input-container">
          <h1>BFV</h1>
          <label htmlFor="shuffle-checkbox" style={{ marginBottom: 20 }}>
            <input
              id="shuffle-checkbox"
              type="checkbox"
              checked={this.state.shuffle}
              onChange={e => this.setState({ shuffle: e.target.checked })}
            />
            Shuffle
          </label>
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={e => this.props.onChange(e, this.state.shuffle)}
          />
          <label id="choose-file-label" htmlFor="file-input">
            Choose a file
          </label>
        </div>
      </div>
    );
  }
}
