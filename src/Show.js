import React, { Component } from "react";
import "./Show.css";

const tumblr_re = /^\d+?\.media\.tumblr\.com$/;

class Gfycat extends Component {
  constructor(props) {
    super(props);
    this.state = { webmUrl: null };
    fetch(`https://api.gfycat.com/v1/gfycats${props.url.pathname}`)
      .then(r => r.json())
      .then(data => this.setState({ webmUrl: data.gfyItem.webmUrl }))
      .catch(err => console.error(err));
  }

  render() {
    return <video autoPlay loop controls src={this.state.webmUrl} />;
  }
}

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

const Strategy = ({ url }) => {
  let title, src;
  switch (true) {
    case url.host === "i.imgur.com":
      if (url.pathname.slice(0, 3) === "/a/") {
        title = "imgur";
        src =
          url.protocol +
          "//imgur.com" +
          url.pathname.replace(".jpg", "") +
          "/embed?pub=true";
        break;
      }
    // eslint-disable-next-line -- FALLTHROUGH
    case tumblr_re.test(url.host):
      return <Img url={url} />;
    case url.host === "gfycat.com":
      return <Gfycat url={url} />;
    case url.host === "www.xvideos.com":
      title = "xvideos";
      src =
        url.origin + "/embedframe/" + url.pathname.match(/\/video(\d+)\//)[1];
      break;
    case url.host === "www.pornhub.com":
      title = "pornhub";
      src = url.origin + "/embed/" + url.searchParams.get("viewkey");
      break;
    case url.host === "xhamster.com":
      title = "xhamster";
      src = url.origin + "/embed/" + url.pathname.split("/")[2];
      break;
    case url.host === "www.hentai-foundry.com":
      const [username, pic_id] = url.pathname
        .match(/^\/pictures\/user\/(.*)\/(.*)\//)
        .slice(1);
      const src_base = [
        "https://pictures.hentai-foundry.com",
        username[0].toLowerCase(),
        username,
        pic_id
      ].join("/");
      return (
        <div
          className="img"
          style={{
            backgroundImage: ["png", "jpg"]
              .map(ext => `url(${src_base}.${ext})`)
              .join(",")
          }}
        />
      );
    default:
      title = "default";
      src = url.href;
  }
  return <Iframe src={src} title={title} />;
};

export default function Show({ link: [list, source], style }) {
  const url = new URL(source);
  return (
    <div key={source} className="item-container" style={style}>
      <div
        style={{
          flexGrow: 0,
          padding: 5,
          paddingTop: 0,
          color: "white"
        }}
      >
        {list} - <a href={url} target="_blank" rel="noopener noreferrer">Source</a>
      </div>
      <Strategy url={url} />
    </div>
  );
}
