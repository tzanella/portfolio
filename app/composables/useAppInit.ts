import { ref, onMounted } from "vue";
import { useWakatimeStats } from "./useWakatimeStats";
import { useLastfm } from "./useLastfm";

const isReadyState = ref<boolean>(false);

export const useAppInit = () => {
  const { fetchStats } = useWakatimeStats();
  const { fetchTrack } = useLastfm();

  const initApp = async () => {
    try {
      await Promise.allSettled([fetchStats(), fetchTrack()]);
    } catch {
    } finally {
      setTimeout(() => {
        isReadyState.value = true;
      }, 400);
    }
  };

  onMounted(() => {
    if (!isReadyState.value) {
      initApp();
    }
  });

  return {
    isReady: isReadyState,
    initApp,
  };
};
