import React, { Component } from "react";
import Viewer from "./Viewer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.fr = new FileReader();
    this.fr.addEventListener("loadend", () => {
      // TODO: improve csv file checking
      try {
        const file = this.fr.result
          .split("\n")
          .map(row => row.split(",")[1])
          .slice(1);
        this.setState({ file });
      } catch (err) {
        this.setState({
          error: "Could not parse file, make sure you extract the csv"
        });
      }
    });
    this.state = { file: null, error: null };
  }

  handleChange = files => this.fr.readAsText(files[0]);

  render() {
    if (this.state.file === null) {
      return (
        <>
          <div>{this.state.error}</div>
          <input
            type="file"
            onChange={e => this.handleChange(e.target.files)}
          />
        </>
      );
    }
    return (
      <Viewer
        links={this.state.file.filter(url => {
          return url && url.includes("imgur") && url.includes("/a/");
        })}
      />
    );
  }
}
