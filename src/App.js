import React, { Component } from "react";
import FileInput from "./FileInput";
import Viewer from "./Viewer";
import _ from "lodash";

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      content: null,
      types: []
    };
  }

  readFile = (data) => {
    const { content, types} = this.state
    let items = (content === null ? {} : content)
    let contentTypes = types
    for (let value of data) {
        let type = value[0]
        type = type.charAt(0).toUpperCase() + type.substr(1)
        let url = value[1]
        if (typeof url === "undefined" || !url.startsWith("http")) {
            continue
        }
        if (!_.includes(contentTypes, type)) {
            items[type] = []
            contentTypes.push(type)
        }
        items[type].push(url)
        
    }

    contentTypes = _.sortBy(contentTypes)
    
    this.setState({
        content: items,
        types: contentTypes
    })
}

  render() {
    const { content, types } = this.state
    if (content === null) {
      return <FileInput onFileLoaded={this.readFile} />;
    }
    return <Viewer content={content} types={types} />;
  }
}
