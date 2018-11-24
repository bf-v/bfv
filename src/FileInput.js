import React, { Component } from "react";
import "./FileInput.css";

const PINK = "rgb(255,92,148)";

export default class FileInput extends Component {
  render() {
    return (
      <div className="file-input-container">
        <h1>BFV</h1>
        <input id="file-input" type="file" onChange={this.props.onChange} />
        <label htmlFor="file-input">Choose a file</label>
      </div>
    );
  }
}
