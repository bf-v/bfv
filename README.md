# BFV(iewer) fork

[![Build test](https://github.com/bf-c/bfv/actions/workflows/build-test.yml/badge.svg)](https://github.com/bf-c/bfv/actions/workflows/build-test.yml?query=event%3Apush)
[![codecov](https://codecov.io/gh/bf-c/bfv/branch/master/graph/badge.svg?token=GNT0HRZ34D)](https://codecov.io/gh/bf-c/bfv)

This is a fork of the [original][1], which seems to be abandoned.

Just export the favorites or likes zip from BF, unzip, and choose the resultant csv file in the file input menu.

## Contributing

Please do. Not all content hosts are supported, just the ones that came up frequently for myself.
The relevant code is located in [`Show.tsx`][2], the following is a snippet:

```
case url.host === "gfycat.com": {
  title = "gfycat";
  src = url.origin + "/ifr" + url.pathname;
  break;
}
// outside switch:
return <Iframe src={src} title={title} />;
```

The idea is that `Strategy` is a function that takes a js `URL` object and returns an HTML element that renders
the relevant content. Here, if the host is `gfycat.com`, then an iframe is rendered with the appropriate src attribute.

[1]: https://github.com/bf-v/bfv
[2]: https://github.com/bf-c/bfv/blob/master/src/app/viewer-with-links/viewer/show/Show.tsx
