import React, { Component } from "react";
import "./FileInput.css";
import PapaParse from "papaparse";

export default class FileInput extends Component {

   handleChangeFile = e => {
    for (let value of e.target.files) {
      PapaParse.parse(value, {
        complete: (result) => {
          this.props.onFileLoaded(result.data, value.name);
        }
      });
    }
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="file-input-container">
          <h1>BFV</h1>
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={this.handleChangeFile}
            multiple
          />
          <label htmlFor="file-input">Choose a file</label>
        </div>
      </div>
    );
  }

}
