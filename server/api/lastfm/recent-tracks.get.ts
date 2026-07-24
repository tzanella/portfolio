import { profileData } from "~/utils/profileData";

export default defineEventHandler(async () => {
  try {
    const config = useRuntimeConfig();
    const apiKey = config.lastfmApiKey || process.env.NUXT_LASTFM_API_KEY || "";
    const url = profileData.apis.lastfm.getRecentTracks.replace("{lastfm_api_key}", apiKey);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Last.fm status ${response.status}`);
    }

    const json = await response.json();
    const tracks = json?.recenttracks?.track;
    if (!Array.isArray(tracks) || tracks.length === 0) {
      return { isPlaying: false };
    }

    const currentTrack = tracks[0];
    const isPlaying = currentTrack?.["@attr"]?.nowplaying === "true";
    if (!isPlaying) {
      return { isPlaying: false };
    }

    const name = currentTrack?.name || "";
    const artist =
      typeof currentTrack?.artist === "object"
        ? currentTrack.artist?.["#text"] || currentTrack.artist?.name || ""
        : currentTrack?.artist || "";
    const album =
      typeof currentTrack?.album === "object"
        ? currentTrack.album?.["#text"] || currentTrack.album?.name || ""
        : currentTrack?.album || "";
    const trackUrl = currentTrack?.url || profileData.socials.lastfm;
    const mbid = currentTrack?.mbid || "";

    let imageUrl = "";
    if (Array.isArray(currentTrack?.image)) {
      const sizes = ["extralarge", "large", "medium", "small"];
      for (const s of sizes) {
        const found = currentTrack.image.find((img: any) => img.size === s && img["#text"]);
        if (found && found["#text"]) {
          imageUrl = found["#text"];
          break;
        }
      }
      if (!imageUrl) {
        const anyImg = currentTrack.image.find((img: any) => img["#text"]);
        if (anyImg) imageUrl = anyImg["#text"];
      }
    }

    if (!imageUrl && isPlaying) {
      try {
        let infoUrl = "";
        if (mbid) {
          infoUrl = profileData.apis.lastfm.getTrackInfo
            .replace("{lastfm_api_key}", apiKey)
            .replace("{mbid}", mbid);
        } else if (artist && name) {
          infoUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(name)}&format=json`;
        }

        if (infoUrl) {
          const infoRes = await fetch(infoUrl);
          if (infoRes.ok) {
            const infoJson = await infoRes.json();
            const albumImages = infoJson?.track?.album?.image || infoJson?.track?.image;
            if (Array.isArray(albumImages)) {
              const sizes = ["extralarge", "large", "medium", "small"];
              for (const s of sizes) {
                const found = albumImages.find((img: any) => img.size === s && img["#text"]);
                if (found && found["#text"]) {
                  imageUrl = found["#text"];
                  break;
                }
              }
              if (!imageUrl) {
                const anyImg = albumImages.find((img: any) => img["#text"]);
                if (anyImg) imageUrl = anyImg["#text"];
              }
            }
          }
        }
      } catch {
      }
    }

    return {
      isPlaying: true,
      name,
      artist,
      album,
      url: trackUrl,
      image: imageUrl,
    };
  } catch (err: any) {
    return { isPlaying: false, error: err?.message || "Failed to fetch recent tracks" };
  }
});
