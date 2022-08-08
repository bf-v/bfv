import React, { Component } from "react";

class Img extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, error: false };
  }

  imgLoaded = () => this.setState({ loading: false });

  imgErrored = () => this.setState({ loading: false, error: true });

  render() {
    const className = this.state.loading
      ? "loading"
      : this.state.error
      ? "error"
      : "";
    return (
      <img
        className={className}
        alt=""
        src={this.props.url.href}
        onLoad={this.imgLoaded}
        onError={this.imgErrored}
        style={{ objectFit: "contain" }}
      />
    );
  }
}

export default Img;
