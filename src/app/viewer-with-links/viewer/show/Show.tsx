import React from 'react';
import './Show.css';
import Gfycat from './gfycat/Gfycat';
import Iframe from './Iframe';
import Img from './Img';

const tumblr_re = /^\d+?\.media\.tumblr\.com$/;

type StrategyProps = {
  url: URL;
};

const Strategy = ({ url }: StrategyProps) => {
  let title = 'default';
  let src = url.href;
  switch (true) {
    case url.host === 'i.imgur.com': {
      if (url.pathname.slice(0, 3) === '/a/') {
        title = 'imgur';
        src = `${url.protocol}//imgur.com${url.pathname.replace(
          '.jpg',
          '',
        )}/embed?pub=true`;
        break;
      }
    }
    // eslint-disable-next-line -- FALLTHROUGH
    case tumblr_re.test(url.host): {
      return <Img url={url} />;
    }
    case url.host === 'gfycat.com' || url.host === 'redgifs.com': {
      return <Gfycat title={title} url={url} />;
    }
    case url.host === 'www.xvideos.com': {
      const matches = url.pathname.match(/\/video(\d+)\//);
      title = 'xvideos';
      if (matches) {
        src = `${url.origin}/embedframe/${matches[1]}`;
      }
      break;
    }
    case url.host === 'www.pornhub.com': {
      title = 'pornhub';
      src = `${url.origin}/embed/${url.searchParams.get('viewkey')}`;
      break;
    }
    case url.host === 'xhamster.com': {
      title = 'xhamster';
      src = `${url.origin}/embed/${url.pathname.split('/')[2]}`;
      break;
    }
    case url.host === 'www.hentai-foundry.com': {
      const matches = url.pathname.match(/^\/pictures\/user\/(.*)\/(.*)\//);
      if (matches) {
        const [username, pic_id] = matches.slice(1);
        const srcBase = [
          'https://pictures.hentai-foundry.com',
          username[0].toLowerCase(),
          username,
          pic_id,
        ].join('/');
        return (
          <div
            className="img"
            style={{
              backgroundImage: ['png', 'jpg']
                .map(ext => `url(${srcBase}.${ext})`)
                .join(','),
            }}
          />
        );
      }
    }
  }
  return <Iframe src={src} title={title} />;
};

type ShowProps = {
  link: string;
};

export default function Show({ link }: ShowProps) {
  const url = new URL(link);
  return (
    <div key={link} className="item-container">
      <Strategy url={url} />
    </div>
  );
}
