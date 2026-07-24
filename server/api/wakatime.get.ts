import { profileData } from "~/utils/profileData";

export default defineEventHandler(async () => {
  try {
    const response = await fetch(profileData.apis.wakatime.stats);
    if (!response.ok) {
      throw new Error(`Wakatime status ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch {
    return null;
  }
});
