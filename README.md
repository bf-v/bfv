This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# BFV(iewer)

RIP BF

This is something quick I made to fill the void that BF has left behind while the devs and the community figure out what the next steps are.
This does not claim to do any of the amazing things that BF did, but is simply a means to view the items that you've already liked/favorited.

Just export the favorites or likes zip from BF, unzip, and choose the resultant csv file in the file input menu.

## Contributing

Please do. Once again, I drew this up in two nights, so functionality is guaranteed to be spotty. Also, not all content hosts are supported,
just the ones that came up frequently for myself. The relevant code is located in `src/Show.js`, the following is a snippet:

```
case url.host === "gfycat.com":
  title = "gfycat";
  src = url.origin + "/ifr" + url.pathname;
  break;
// outside switch:
return <Iframe src={src} title={title} />;
```

The idea is that `Strategy` is a function that takes a js `URL` object and returns an HTML element that renders
the relevant content. Here, if the host is `gfycat.com`, then an iframe is rendered with the appropriate src attribute.

Honestly I have no idea what I'm doing, this is my first open source anything.
