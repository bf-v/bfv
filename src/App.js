import React, { Component } from "react";
import FileInput from "./FileInput";
import Viewer from "./Viewer";

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      content: null
    };
  }

  readFile = (file) => {
    const { content } = this.state
    let items = (content === null ? {} : content)
    let types = []
    for (let row of file) {
        let type = row[0]
        type = type.charAt(0).toUpperCase() + type.substr(1)
        let url = row[1]
        if (typeof url === "undefined" || !url.startsWith("http")) {
            continue
        }
        if (!types.includes(type)) {
            items[type] = []
            types.push(type)
        }
        items[type].push(url)
    }

    this.setState({
        content: items,
    })
}

  render() {
    const { content } = this.state
    if (content === null) {
      return <FileInput onFileLoaded={this.readFile} />;
    }
    return <Viewer content={content} />;
  }
}
