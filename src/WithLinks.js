import React, { Component } from "react";
import { parse } from "papaparse";
import "./WithLinks.css";

function shuffled(inp) {
  const arr = inp.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default LinkConsumer =>
  class extends Component {
    state = {};

    handleFile = e => {
      for (let file of e.target.files) {
        parse(file, {
          complete: res =>
            this.setState(state =>
              Object.keys(state).reduce(
                (b, x) => {
                  if (!(x in b)) b[x] = [];
                  b[x].push(...state[x]);
                  return b;
                },
                res.data.reduce((a, [list, src]) => {
                  if (src && src.startsWith("http")) {
                    if (!(list in a)) a[list] = [];
                    a[list].push(src);
                  }
                  return a;
                }, {})
              )
            )
        });
      }
    };

    render() {
      if (Object.keys(this.state).length === 0) {
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
            <div className="file-input-container">
              <h1>BFV</h1>
              <input
                id="file-input"
                type="file"
                accept=".csv"
                onChange={this.handleFile}
                multiple
              />
              <label htmlFor="file-input">Choose a file</label>
            </div>
          </div>
        );
      }
      return (
        <LinkConsumer
          links={Object.keys(this.state).reduce((a, x) => {
            a[x] = shuffled(this.state[x]);
            return a;
          }, {})}
        />
      );
    }
  };
