import axios from 'axios';

const getRedGifsToken = async () => {
  let token: string | null = null;
  const TOKEN_KEY_NAME = 'redgifs_token';
  if (
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(TOKEN_KEY_NAME)
  ) {
    token = localStorage.getItem(TOKEN_KEY_NAME);
  } else {
    const { data } = await axios.get(
      'https://api.redgifs.com/v2/auth/temporary',
    );
    token = data.token;
  }
  if (token && typeof localStorage !== 'undefined') {
    localStorage.setItem(TOKEN_KEY_NAME, token);
  }
  return token;
};

export const getUrlFromRedGifs = async (_gfyId: string) => {
  const token = await getRedGifsToken();
  if (!token) {
    return null;
  }
  const gfyId = _gfyId.toLowerCase();
  const { data } = await axios.get(`https://api.redgifs.com/v2/gifs/${gfyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { urls } = data.gif;
  const url = new URL(urls.hd || urls.sd);
  if (url.hostname === 'thumbs2.redgifs.com') {
    url.hostname = 'thumbs3.redgifs.com';
  }
  return url.toString();
};

export const getUrlFromGfycat = async (gfyId: string) => {
  const { data } = await axios.get(
    `https://api.gfycat.com/v1/gfycats/${gfyId}`,
  );
  const { gfyItem } = data;
  return gfyItem.mp4Url;
};

const resolveFirstSequentially = async <T>(
  promises: (() => Promise<T>)[],
): Promise<T> => {
  const errors = [];
  for (const promise of promises) {
    try {
      const result = await promise();
      if (result) {
        return result;
      }
    } catch (e) {
      errors.push(e);
    }
  }
  throw new AggregateError(errors);
};

const gfycatStoreKey = 'gfycatUrls';

type Store = {
  [key: string]: {
    expiresAt: number;
    url: string;
  };
};

const GfycatStore = (() => {
  let store: Store;
  try {
    store = JSON.parse(localStorage.getItem(gfycatStoreKey) || '{}');
  } catch (e) {
    store = {};
  }

  const cleanExpired = () => {
    const now = new Date().getTime();
    for (const id in store) {
      if (store[id].expiresAt <= now) {
        delete store[id];
      }
    }
  };

  return {
    get: async (gfyId: string) => {
      cleanExpired();
      if (!(gfyId in store)) {
        const url = await resolveFirstSequentially<string | null>([
          () => getUrlFromRedGifs(gfyId),
          () => getUrlFromGfycat(gfyId),
        ]);
        if (!url) {
          throw new Error('No URL found for Gfycat');
        }
        store[gfyId] = {
          url,
          expiresAt: new Date().getTime() + 1 * 24 * 60 * 60 * 1000, // 1 day
        };
      }
      localStorage.setItem(gfycatStoreKey, JSON.stringify(store));
      return store[gfyId].url;
    },
  };
})();

export default GfycatStore;
