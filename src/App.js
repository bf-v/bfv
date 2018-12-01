import React, { Component } from "react";
import FileInput from "./FileInput";
import Viewer from "./Viewer";

export default class App extends Component {
  state = { content: null };

  handleChange = content => {
    this.setState({ content });
  };

  render() {
    if (this.state.content === null) {
      return <FileInput onChange={this.handleChange} />;
    }
    return <Viewer links={this.state.content} />;
  }
}
