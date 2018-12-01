import React, { Component } from "react";
import "./FileInput.css";

function shuffled(inp) {
  const arr = inp.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = { shuffle: true };
    this.fr = new FileReader();
    this.fr.addEventListener("loadend", () => {
      const csv = this.fr.result.split("\n");
      if (csv[0] !== "listname,source,type,description") {
        window.alert("Provided csv file is not a BF export");
        return;
      }
      // links is a list of (listname, source) tuples
      let content = csv
        .slice(1)
        .filter(x => !!x)
        .map(r => r.split(",").slice(0, 2));
      content = this.state.shuffle ? shuffled(content) : content;
      this.props.onChange(content);
    });
  }

  handleChange = evt => {
    this.fr.readAsText(evt.target.files[0]);
  };

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
            onChange={this.handleChange}
          />
          <label id="choose-file-label" htmlFor="file-input">
            Choose a file
          </label>
        </div>
      </div>
    );
  }
}
