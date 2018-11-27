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
      <div className="file-input-container">
        <h1>BFV</h1>
        <input id="file-input" multiple type="file" accept=".csv" onChange={e => this.handleChangeFile(e)} />
        <label htmlFor="file-input">Choose a file</label>
      </div>
    );
  }

}
