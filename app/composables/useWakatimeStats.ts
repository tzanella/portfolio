import { ref, onMounted } from "vue";

export interface PrunedLang {
  name: string;
  text: string;
  percent: number;
  total_seconds: number;
  hours?: number;
}

export interface PrunedCat {
  name: string;
  text: string;
  percent: number;
  total_seconds: number;
}

export interface PrunedStats {
  human_readable_total: string;
  human_readable_daily_average: string;
  human_readable_range: string;
  languages: PrunedLang[];
  categories: PrunedCat[];
}

interface MetaPayload {
  timestamp: number;
  human_readable_total: string;
  human_readable_daily_average: string;
  human_readable_range: string;
}

interface LangsPayload {
  timestamp: number;
  languages: PrunedLang[];
}

interface CatsPayload {
  timestamp: number;
  categories: PrunedCat[];
}

const statsState = ref<PrunedStats | null>(null);
const loadingState = ref<boolean>(true);
const errorState = ref<string | null>(null);
let fetchPromise: Promise<any> | null = null;

const TTL = 10 * 60 * 1000;

export const useWakatimeStats = () => {
  const cookieMeta = useCookie<MetaPayload | null>("waka_meta_v1", {
    maxAge: 600,
    sameSite: "lax",
    path: "/",
  });
  const cookieLangs = useCookie<LangsPayload | null>("waka_langs_v1", {
    maxAge: 600,
    sameSite: "lax",
    path: "/",
  });
  const cookieCats = useCookie<CatsPayload | null>("waka_cats_v1", {
    maxAge: 600,
    sameSite: "lax",
    path: "/",
  });

  const getCachedData = (): PrunedStats | null => {
    const now = Date.now();

    if (
      cookieMeta.value &&
      cookieLangs.value &&
      cookieCats.value &&
      cookieMeta.value.timestamp &&
      now - cookieMeta.value.timestamp < TTL
    ) {
      return {
        human_readable_total: cookieMeta.value.human_readable_total || "",
        human_readable_daily_average: cookieMeta.value.human_readable_daily_average || "",
        human_readable_range: cookieMeta.value.human_readable_range || "",
        languages: cookieLangs.value.languages || [],
        categories: cookieCats.value.categories || [],
      };
    }

    if (typeof window !== "undefined") {
      try {
        const rawLocal = localStorage.getItem("wakatime_local_cache_v1");
        if (rawLocal) {
          const parsed = JSON.parse(rawLocal);
          if (parsed && parsed.timestamp && now - parsed.timestamp < TTL) {
            return {
              human_readable_total: parsed.human_readable_total || "",
              human_readable_daily_average: parsed.human_readable_daily_average || "",
              human_readable_range: parsed.human_readable_range || "",
              languages: parsed.languages || [],
              categories: parsed.categories || [],
            };
          }
        }
      } catch {
      }
    }

    return null;
  };

  const saveCachedData = (data: PrunedStats) => {
    const timestamp = Date.now();

    cookieMeta.value = {
      timestamp,
      human_readable_total: data.human_readable_total,
      human_readable_daily_average: data.human_readable_daily_average,
      human_readable_range: data.human_readable_range,
    };

    cookieLangs.value = {
      timestamp,
      languages: data.languages,
    };

    cookieCats.value = {
      timestamp,
      categories: data.categories,
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          "wakatime_local_cache_v1",
          JSON.stringify({
            timestamp,
            ...data,
          })
        );
      } catch {
      }
    }
  };

  const initialCache = getCachedData();
  if (initialCache) {
    statsState.value = initialCache;
    loadingState.value = false;
  }

  const fetchStats = async (force = false) => {
    const cached = getCachedData();
    if (!force && cached) {
      statsState.value = cached;
      loadingState.value = false;
      return cached;
    }

    if (fetchPromise) {
      return await fetchPromise;
    }

    if (!statsState.value) {
      loadingState.value = true;
    }

    fetchPromise = (async () => {
      try {
        const response = await $fetch<any>("/api/wakatime");
        if (response && response.data) {
          const raw = response.data;
          const cleaned: PrunedStats = {
            human_readable_total: raw.human_readable_total || "",
            human_readable_daily_average: raw.human_readable_daily_average || "",
            human_readable_range: raw.human_readable_range || "",
            languages: Array.isArray(raw.languages)
              ? raw.languages.map((l: any) => ({
                  name: l.name,
                  text: l.text,
                  percent: l.percent,
                  total_seconds: l.total_seconds,
                  hours: l.hours,
                }))
              : [],
            categories: Array.isArray(raw.categories)
              ? raw.categories.map((c: any) => ({
                  name: c.name,
                  text: c.text,
                  percent: c.percent,
                  total_seconds: c.total_seconds,
                }))
              : [],
          };

          statsState.value = cleaned;
          saveCachedData(cleaned);
          errorState.value = null;
          return cleaned;
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err: any) {
        errorState.value = err?.message || "Failed to fetch stats";
        const fallback = getCachedData();
        if (fallback) {
          statsState.value = fallback;
        }
        return statsState.value;
      } finally {
        loadingState.value = false;
        fetchPromise = null;
      }
    })();

    return await fetchPromise;
  };

  onMounted(() => {
    fetchStats();
  });

  return {
    stats: statsState,
    loading: loadingState,
    error: errorState,
    fetchStats,
  };
};
