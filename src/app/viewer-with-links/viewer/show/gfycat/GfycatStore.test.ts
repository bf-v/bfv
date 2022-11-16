import { describe, expect, it } from 'vitest';
import { getUrlFromGfycat, getUrlFromRedGifs } from './GfycatStore';
import axios from 'axios';

describe('getUrlFromRedGifs', () => {
  it('should work', async () => {
    const url = await getUrlFromRedGifs('EnchantingScaryConure');
    expect(url).not.toBeNull();
    if (!url) {
      return;
    }
    const { headers, status } = await axios.head(url);
    expect(status).toBe(200);
    expect(headers['content-type']).toStrictEqual('video/mp4');
  });
});

describe('getUrlFromGfycat', () => {
  it('should work', async () => {
    const url = await getUrlFromGfycat('DrearyBrownClam');
    const { headers, status } = await axios.head(url);
    expect(status).toBe(200);
    expect(headers['content-type']).toStrictEqual('video/mp4');
  });
});

export {};
