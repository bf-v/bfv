import React, { useState } from 'react';

type ImgProps = {
  url: URL;
};

const Img = ({ url }: ImgProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const className = loading ? 'loading' : error ? 'error' : '';
  return (
    <img
      className={className}
      alt=""
      src={url.href}
      onLoad={() => setLoading(false)}
      onError={() => {
        setLoading(false);
        setError(true);
      }}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Img;
