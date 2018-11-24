import React from "react";

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
  switch (true) {
    case url.host === "i.imgur.com":
      if (url.pathname.slice(0, 3) === "/a/") {
        return (
          <Iframe
            title="imgur"
            src={
              url.protocol +
              "//imgur.com/" +
              url.pathname.slice(1).replace(".jpg", "") +
              "/embed?pub=true"
            }
          />
        );
      }
    // eslint-disable-next-line -- FALLTHROUGH
    case tumblr_re.test(url.host):
      return (
        <div
          style={{
            backgroundImage: `url(${url.href})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain"
          }}
        />
      );
    case url.host === "gfycat.com":
      return <Iframe title="gfycat" src={url.origin + "/ifr" + url.pathname} />;
    case url.host === "www.xvideos.com":
      return (
        <Iframe
          title="xvideos"
          src={
            url.origin +
            "/embedframe/" +
            url.pathname.match(/\/video(\d+)\//)[1]
          }
        />
      );
    case url.host === "www.pornhub.com":
      return (
        <Iframe
          title="pornhub"
          src={url.origin + "/embed/" + url.searchParams.get("viewkey")}
        />
      );
    case url.host === "xhamster.com":
      return (
        <Iframe
          title="xhamster"
          src={url.origin + "/embed/" + url.pathname.split("/")[2]}
        />
      );
    default:
      return <Iframe title="default" src={url.href} />;
  }
};

export default function Show({ link }) {
  const url = new URL(link);
  return <Strategy url={url} />;
}
