import React, { Component } from "react";
import WithLinks from "./WithLinks";
import Viewer from "./Viewer";

const LinkedViewer = WithLinks(Viewer);

export default class App extends Component {
  render() {
    return <LinkedViewer />;
  }
}
