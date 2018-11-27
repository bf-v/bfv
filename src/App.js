import React, { Component } from "react";
import FileInput from "./FileInput";
import Viewer from "./Viewer";

function shuffled(inp) {
  const arr = inp.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { content: null, shuffle: true };
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
      this.setState({ content });
    });
  }

  handleChange = (evt, shuffle) => {
    this.setState({ shuffle });
    this.fr.readAsText(evt.target.files[0]);
  };

  render() {
    if (this.state.content === null) {
      return <FileInput onChange={this.handleChange} />;
    }
    return <Viewer links={this.state.content} />;
  }
}
