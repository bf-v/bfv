import React, { Component } from "react";
import FileInput from "./FileInput";
import Viewer from "./Viewer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.fr = new FileReader();
    this.fr.addEventListener("loadend", () => {
      const file = this.fr.result
        .split("\n")
        .map(row => row.split(",")[1])
        .slice(1);
      this.setState({ file });
    });
    this.state = { file: null };
  }

  handleChange = evt => this.fr.readAsText(evt.target.files[0]);

  render() {
    if (this.state.file === null) {
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
          <FileInput onChange={this.handleChange} />
        </div>
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
