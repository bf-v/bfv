import React, { Component } from "react";
import GfycatStore from "./GfycatStore";

class Gfycat extends Component {
  constructor(props) {
    super(props);
    this.state = { webmUrl: null, error: null };
    const gfyId = props.url.pathname.substring(1);
    console.log(`https://gfycat.com/${gfyId}`);
    GfycatStore.get(gfyId)
      .then(webmUrl => this.setState({ webmUrl }))
      .catch(err => {
        console.error(err);
        this.setState({ error: err });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error">
          <div className="error-message">
            Error loading Gfycat. You can{" "}
            <a target="_blank" rel="noopener" href={this.props.url}>
              try the direct link
            </a>
            .
          </div>
        </div>
      );
    }
    return (
      <video
        autoPlay
        loop
        controls
        src={this.state.webmUrl}
        onError={error => this.setState({ error })}
      />
    );
  }
}

export default Gfycat;
