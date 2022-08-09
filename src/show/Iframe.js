import React, { Component } from "react";

class Iframe extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  imgLoaded = () => this.setState({ loading: false });

  render() {
    const { src, title, ...restProps } = this.props;
    return (
      <iframe
        className={this.state.loading ? "iframe-loading" : ""}
        onLoad={this.imgLoaded}
        title={title}
        src={src}
        frameBorder="0"
        scrolling="no"
        {...restProps}
      />
    );
  }
}

export default Iframe;
