import React, { Component } from "react";
import FileInput from "./FileInput";
import Viewer from "./Viewer";
import _ from "lodash";

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      files: null,
      types: []
    };
  }

  readFile = (data) => {
    const { files, types} = this.state
    let items = (files === null ? {} : files)
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
        files: items,
        types: contentTypes
    })
}

  render() {
    const { files, types } =  this.state
    if (files === null) {
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
          <FileInput onFileLoaded={this.readFile} />
        </div>
      );
    }
    return <Viewer files={files} types={types} />;
  }
}
