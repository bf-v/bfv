import React, { Component } from "react";
import "./FileInput.css";
const PapaParse = require('papaparse/papaparse.min.js');

export default class FileInput extends Component {

   handleChangeFile = e => {
    for (let value of e.target.files) {
        let reader  = new FileReader()
        const filename = value.name;
        reader.onload = event => {
            const csvData = PapaParse.parse(
              event.target.result,
            );
            this.props.onFileLoaded(csvData.data, filename);
          };

        reader.readAsText(value);
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
