import React from "react";
import "./Show.css"

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

const Strategy = ({ url }) => {
  let title, src;
  switch (true) {
    case url.host === "i.imgur.com":
      if (url.pathname.slice(0, 3) === "/a/") {
        title = "imgur";
        src =
          url.protocol +
          "//imgur.com/" +
          url.pathname.slice(1).replace(".jpg", "") +
          "/embed?pub=true";
        break;
      }
    // eslint-disable-next-line -- FALLTHROUGH
    case tumblr_re.test(url.host):
      return (
        <div className="img" style={{ backgroundImage: `url(${url.href})` }} />
      );
    case url.host === "gfycat.com":
      title = "gfycat";
      src = url.origin + "/ifr" + url.pathname;
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
        pic_id
      ].join("/");
      return (
        <div
          className="img"
          style={{
            backgroundImage: `url(${src_base}.jpg), url(${src_base}.png)`
          }}
        />
      );
    default:
      title = "default";
      src = url.href;
  }
  return <Iframe src={src} title={title} />;
};

export default function Show({ link }) {
  const url = new URL(link);
  return <Strategy url={url} />;
}
