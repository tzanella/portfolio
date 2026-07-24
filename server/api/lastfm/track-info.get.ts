import { profileData } from "~/utils/profileData";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const apiKey = config.lastfmApiKey || process.env.NUXT_LASTFM_API_KEY || "";
    const query = getQuery(event);
    const mbid = (query.mbid as string) || "";
    const artist = (query.artist as string) || "";
    const track = (query.track as string) || "";

    let url = "";
    if (mbid) {
      url = profileData.apis.lastfm.getTrackInfo
        .replace("{lastfm_api_key}", apiKey)
        .replace("{mbid}", mbid);
    } else if (artist && track) {
      url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`;
    } else {
      return { error: "Missing mbid or artist and track parameters" };
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Last.fm status ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (err: any) {
    return { error: err?.message || "Failed to fetch track info" };
  }
});
