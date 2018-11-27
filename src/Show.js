import React from "react";
import "./Show.css";

const tumblr_re = /^\d+?\.media\.tumblr\.com$/;

const Iframe = ({ src, title, ...restProps }) => (
  <iframe
    title={title}
    src={src}
    frameBorder="0"
    scrolling="no"
    {...restProps}
  />
);

const getGfycatUrl = url => {
  return fetch(`https://gfycat.com/cajax/get${url.pathname}`)
    .then(r => r.json())
    .then(data => data.gfyItem.webmUrl);
};

class Strategy extends React.PureComponent {
  state = { gfycatUrl: null };

  componentDidMount() {
    const { url } = this.props;
    if (url.host === "gfycat.com") {
      getGfycatUrl(this.props.url).then(gfycatUrl => {
        this.setState({ gfycatUrl });
      });
    }
  }

  render() {
    const { url } = this.props;

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
        return (
          <div
            className="img"
            style={{ backgroundImage: `url(${url.href})` }}
          />
        );
      case url.host === "gfycat.com":
        const { gfycatUrl } = this.state;
        if (gfycatUrl) {
          return (
            <video
              src={gfycatUrl}
              style={{ height: "70vh", width: "100%" }}
              autoPlay
              loop
              controls
            />
          );
        }
        title = "gfycat";
        break;
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
          pic_id,
        ].join("/");
        return (
          <div
            className="img"
            style={{
              backgroundImage: ["png", "jpg"]
                .map(ext => `url(${src_base}.${ext})`)
                .join(","),
            }}
          />
        );
      default:
        title = "default";
        src = url.href;
    }
    return (
      <div className="iframe-loading">
        <Iframe src={src} title={title} />
      </div>
    );
  }
}

export default function Show({ link: [list, source], style }) {
  const url = new URL(source);
  return (
    <div key={source} className="item-container" style={style}>
      <div
        style={{
          flexGrow: 0,
          padding: 5,
          paddingTop: 0,
          color: "white",
        }}
      >
        {list}
      </div>
      <Strategy url={url} />
    </div>
  );
}
