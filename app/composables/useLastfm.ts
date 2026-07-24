import { ref, onMounted, onUnmounted } from "vue";

export interface LastfmTrackState {
  isPlaying: boolean;
  name?: string;
  artist?: string;
  album?: string;
  url?: string;
  image?: string;
}

const currentTrackState = ref<LastfmTrackState | null>(null);
const loadingState = ref<boolean>(false);
let intervalId: any = null;

export const useLastfm = () => {
  const fetchTrack = async () => {
    try {
      loadingState.value = true;
      const response = await $fetch<LastfmTrackState>("/api/lastfm/recent-tracks");
      if (response) {
        currentTrackState.value = response;
      }
    } catch {
      currentTrackState.value = { isPlaying: false };
    } finally {
      loadingState.value = false;
    }
  };

  onMounted(() => {
    fetchTrack();
    if (!intervalId && typeof window !== "undefined") {
      intervalId = setInterval(fetchTrack, 30000);
    }
  });

  onUnmounted(() => {
    if (intervalId && typeof window !== "undefined") {
      clearInterval(intervalId);
      intervalId = null;
    }
  });

  return {
    track: currentTrackState,
    loading: loadingState,
    fetchTrack,
  };
};
