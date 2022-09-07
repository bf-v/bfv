import React, { HTMLAttributes, useState } from 'react';

type IframeProps = {
  src: string;
  title: string;
} & HTMLAttributes<HTMLIFrameElement>;

const Iframe = ({ src, title, ...restProps }: IframeProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <iframe
      className={loading ? 'iframe-loading' : ''}
      onLoad={() => setLoading(false)}
      title={title}
      src={src}
      frameBorder="0"
      scrolling="no"
      {...restProps}
    />
  );
};

export default Iframe;
