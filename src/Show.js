import React from "react";

const tumblr_re = /^\d+?\.media\.tumblr\.com$/;

const Strategy = url => {
  switch (true) {
    case url.host === "i.imgur.com":
      if (url.pathname.slice(0, 3) === "/a/") {
        return (
          <iframe
            title="imgur"
            style={{
              width: "100%",
              height: "100%"
            }}
            src={
              url.protocol +
              "//imgur.com/" +
              url.pathname.slice(1).replace(".jpg", "") +
              "/embed?pub=true"
            }
            frameBorder="0"
            scrolling="no"
          />
        );
      }
    // eslint-disable-next-line -- FALLTHROUGH
    case tumblr_re.test(url.host):
      return (
        <img
          src={url.href}
          alt=""
          style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    case url.host === "gfycat.com":
      return (
        <iframe
          title="gfycat"
          src={url.origin + "/ifr" + url.pathname}
          frameBorder="0"
          scrolling="no"
          style={{ width: "100%", height: "100%" }}
        />
      );
    case url.host === "www.xvideos.com":
      return (
        <iframe
          title="xvideos"
          src={
            url.origin +
            "/embedframe/" +
            url.pathname.match(/\/video(\d+)\//)[1]
          }
          frameBorder="0"
          scrolling="no"
          style={{ width: "100%", height: "100%" }}
        />
      );
    case url.host === "www.pornhub.com":
      return (
        <iframe
          title="pornhub"
          src={url.origin + "/embed/" + url.searchParams.get("viewkey")}
          frameBorder="0"
          scrolling="no"
          style={{ width: "100%", height: "100%" }}
        />
      );
    case url.host === "xhamster.com":
      return (
        <iframe
          title="xhamster"
          src={url.origin + "/embed/" + url.pathname.split("/")[2]}
          frameBorder="0"
          scrolling="no"
          style={{ width: "100%", height: "100%" }}
        />
      );
    default:
      return (
        <iframe
          title="default"
          src={url.href}
          frameBorder="0"
          style={{ width: "100%", height: "100%" }}
        />
      );
  }
};

export default function Show({ link }) {
  const url = new URL(link);
  return Strategy(url);
}
