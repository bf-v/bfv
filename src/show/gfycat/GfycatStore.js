const getUrlFromRedGifs = async _gfyId => {
  const gfyId = _gfyId.toLowerCase();
  const resp = await fetch(`https://api.redgifs.com/v2/gifs/${gfyId}`);
  const json = await resp.json();
  const { urls } = json.gif;
  const url = new URL(urls.hd || urls.sd);
  if (url.hostname === 'thumbs2.redgifs.com') {
    url.hostname = 'thumbs3.redgifs.com';
  }
  return url.toString();
};

const getUrlFromGfycat = async gfyId => {
  const resp = await fetch(`https://api.gfycat.com/v1/gfycats/${gfyId}`);
  const json = await resp.json();
  const { gfyItem } = json;
  return gfyItem.mp4Url;
};

const resolveFirstSequentially = async promises => {
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

const GfycatStore = (() => {
  let store;
  try {
    store = JSON.parse(localStorage.getItem(gfycatStoreKey) || '{}');
  } catch (e) {
    store = {};
  }

  const cleanExpired = () => {
    const now = new Date();
    for (const id in store) {
      if (store[id].expiresAt <= now) delete store[id];
    }
  };

  return {
    get: async gfyId => {
      cleanExpired();
      if (!(gfyId in store)) {
        const url = await resolveFirstSequentially([
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
