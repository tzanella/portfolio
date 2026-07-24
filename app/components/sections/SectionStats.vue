<template>
  <section id="stats" class="py-24 relative">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="flex flex-col items-center mb-16 text-center">
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-accent-purple text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Icon name="simple-icons:wakatime" class="w-4 h-4 animate-pulse" />
          <span>WakaTime API</span>
        </div>
        <h2
          class="text-3xl md:text-5xl font-bold font-poppins text-white"
        >
          {{ t("stats.title") }}
        </h2>
        <p class="text-slate-400 text-sm md:text-base mt-3 max-w-xl">
          {{ t("stats.subtitle") }}
        </p>
      </div>

      <ClientOnly>
        <div key="stats-skeleton-view" v-if="loading && !stats" class="max-w-7xl mx-auto flex flex-col gap-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="glass p-6 min-h-[130px] animate-pulse flex flex-col justify-between gap-4">
              <div class="h-4 w-32 bg-white/10 rounded-lg"></div>
              <div class="h-8 w-48 bg-white/10 rounded-lg"></div>
            </div>
            <div class="glass p-6 min-h-[130px] animate-pulse flex flex-col justify-between gap-4">
              <div class="h-4 w-32 bg-white/10 rounded-lg"></div>
              <div class="h-8 w-48 bg-white/10 rounded-lg"></div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="glass p-6 min-h-[380px] animate-pulse flex flex-col gap-4">
              <div class="h-6 w-40 bg-white/10 rounded-lg"></div>
              <div v-for="i in 5" :key="`sk-lang-${i}`" class="h-12 w-full bg-white/5 rounded-xl"></div>
            </div>
            <div class="glass p-6 min-h-[380px] animate-pulse flex flex-col gap-4">
              <div class="h-6 w-40 bg-white/10 rounded-lg"></div>
              <div v-for="i in 4" :key="`sk-cat-${i}`" class="h-12 w-full bg-white/5 rounded-xl"></div>
            </div>
          </div>
        </div>

        <div key="stats-real-content" v-else-if="stats" class="max-w-7xl mx-auto flex flex-col gap-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              class="glass p-6 relative overflow-hidden group hover:border-accent-purple/40 transition-all duration-300 flex flex-col justify-between gap-4"
            >
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {{ t("stats.total_time") }}
                  </span>
                  <div class="relative">
                    <button
                      @click="showTooltip = !showTooltip"
                      type="button"
                      class="text-slate-400 hover:text-accent-purple transition-colors p-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
                      :title="t('stats.tooltip_info')"
                      aria-label="Info"
                    >
                      <Icon name="lucide:help-circle" class="w-4 h-4" />
                    </button>

                    <Transition name="fade-slide">
                      <div
                        v-if="showTooltip"
                        class="absolute left-0 sm:left-auto sm:right-0 top-8 z-30 w-64 p-3 rounded-xl bg-[#0d071a] border border-accent-purple/30 shadow-2xl text-xs text-slate-200 backdrop-blur-xl"
                      >
                        <div class="flex items-center gap-2 text-accent-purple font-semibold mb-1">
                          <Icon name="lucide:calendar" class="w-4 h-4" />
                          <span>{{ t("stats.since", { range: stats.human_readable_range }) }}</span>
                        </div>
                        <p class="text-[11px] text-slate-400 leading-snug">
                          {{ t("stats.tooltip_info") }}
                        </p>
                      </div>
                    </Transition>
                  </div>
                </div>
                <div class="p-3 rounded-xl bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                  <Icon name="lucide:clock" class="w-6 h-6" />
                </div>
              </div>

              <div>
                <div class="text-3xl md:text-4xl font-extrabold text-white font-poppins tracking-tight">
                  {{ stats.human_readable_total || 'N/A' }}
                </div>
                <div v-if="stats.human_readable_range" class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                  <Icon name="lucide:info" class="w-3.5 h-3.5 text-accent-purple" />
                  <span>{{ t("stats.since", { range: stats.human_readable_range }) }}</span>
                </div>
              </div>
            </div>

            <div
              class="glass p-6 relative overflow-hidden group hover:border-accent-blue/40 transition-all duration-300 flex flex-col justify-between gap-4"
            >
              <div class="flex justify-between items-start">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {{ t("stats.daily_average") }}
                </span>
                <div class="p-3 rounded-xl bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  <Icon name="lucide:trending-up" class="w-6 h-6" />
                </div>
              </div>

              <div>
                <div class="text-3xl md:text-4xl font-extrabold text-white font-poppins tracking-tight">
                  {{ stats.human_readable_daily_average || 'N/A' }}
                </div>
                <div class="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                  <Icon name="lucide:zap" class="w-3.5 h-3.5 text-accent-blue" />
                  <span>Per active day</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="glass p-6 flex flex-col gap-6">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 class="text-xl font-bold text-white font-poppins flex items-center gap-2.5">
                  <Icon name="lucide:code-2" class="w-5 h-5 text-accent-purple" />
                  {{ t("stats.top_languages") }}
                </h3>
                <span class="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 font-mono">
                  {{ topLanguages.length }} langs
                </span>
              </div>

              <div class="flex flex-col gap-3.5 max-h-[440px] overflow-y-auto pr-1 custom-scrollbar">
                <div
                  v-for="lang in topLanguages"
                  :key="`lang-row-${lang.name}`"
                  class="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all duration-200 flex flex-col gap-2.5 group"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-lg bg-white/5 border border-white/10 text-white flex items-center justify-center">
                        <Icon :name="getLangIcon(lang.name)" class="w-5 h-5" />
                      </div>
                      <span class="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {{ lang.name }}
                      </span>
                    </div>

                    <div class="text-right">
                      <span class="text-sm font-bold text-white font-mono block">
                        {{ lang.text }}
                      </span>
                      <span class="text-[11px] text-slate-400">
                        {{ lang.percent }}%
                      </span>
                    </div>
                  </div>

                  <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full transition-all duration-500"
                      :style="{ width: `${lang.percent}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="glass p-6 flex flex-col gap-6">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 class="text-xl font-bold text-white font-poppins flex items-center gap-2.5">
                  <Icon name="lucide:pie-chart" class="w-5 h-5 text-accent-blue" />
                  {{ t("stats.activity_breakdown") }}
                </h3>
                <span class="text-xs text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 font-mono">
                  {{ categories.length }} {{ t("stats.categories.Coding") ? 'categories' : '' }}
                </span>
              </div>

              <div class="flex flex-col gap-3.5 max-h-[440px] overflow-y-auto pr-1 custom-scrollbar">
                <div
                  v-for="cat in categories"
                  :key="`cat-row-${cat.name}`"
                  class="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all duration-200 flex flex-col gap-2.5 group"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="p-2 rounded-lg bg-white/5 border border-white/10 text-accent-blue flex items-center justify-center">
                        <Icon :name="getCategoryIcon(cat.name)" class="w-5 h-5" />
                      </div>
                      <span class="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {{ getCategoryTitle(cat.name) }}
                      </span>
                    </div>

                    <div class="text-right">
                      <span class="text-sm font-bold text-white font-mono block">
                        {{ cat.text }}
                      </span>
                      <span class="text-[11px] text-slate-400">
                        {{ cat.percent }}%
                      </span>
                    </div>
                  </div>

                  <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-gradient-to-r from-accent-blue to-emerald-400 rounded-full transition-all duration-500"
                      :style="{ width: `${cat.percent}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useWakatimeStats } from "~/composables/useWakatimeStats";

const { t } = useI18n();
const { stats, loading } = useWakatimeStats();

const showTooltip = ref(false);

const excludedLanguages = ["other", "text", "yaml"];

const topLanguages = computed(() => {
  if (!stats.value || !Array.isArray(stats.value.languages)) return [];
  return stats.value.languages.filter((lang) => {
    if (!lang || !lang.name) return false;
    const isExcluded = excludedLanguages.includes(lang.name.toLowerCase().trim());
    const isOverOneHour = (lang.total_seconds || 0) >= 3600 || (lang.hours || 0) >= 1;
    return !isExcluded && isOverOneHour;
  });
});

const categories = computed(() => {
  if (!stats.value || !Array.isArray(stats.value.categories)) return [];
  return stats.value.categories.filter((cat) => cat && cat.name);
});

const langIconsMap = {
  javascript: "logos:javascript",
  typescript: "logos:typescript-icon",
  php: "logos:php",
  json: "vscode-icons:file-type-json",
  ejs: "vscode-icons:file-type-ejs",
  bash: "logos:bash",
  css: "logos:css-3",
  go: "logos:go",
  lua: "logos:lua",
  html: "logos:html-5",
  python: "logos:python",
  markdown: "logos:markdown",
  sql: "logos:mysql",
  "git config": "logos:git-icon",
  git: "logos:git-icon",
  prisma: "logos:prisma",
  pug: "logos:pug",
  dart: "logos:dart",
  mdx: "logos:mdx",
  xml: "vscode-icons:file-type-xml",
  docker: "logos:docker-icon",
  "apache config": "logos:apache",
  "vb.net": "vscode-icons:file-type-vb",
  tsconfig: "logos:typescript-icon",
  c: "logos:c",
  "c++": "logos:c-plusplus",
  "vue.js": "logos:vue",
  java: "logos:java",
  scss: "logos:sass",
  makefile: "vscode-icons:file-type-makefile",
};

const getLangIcon = (name) => {
  const key = (name || "").toLowerCase();
  return langIconsMap[key] || "lucide:code-2";
};

const categoryIconsMap = {
  coding: "lucide:terminal",
  "ai coding": "lucide:sparkles",
  debugging: "lucide:bug",
  building: "lucide:hammer",
  "writing docs": "lucide:file-text",
  "writing tests": "lucide:shield-check",
};

const getCategoryIcon = (name) => {
  const key = (name || "").toLowerCase();
  return categoryIconsMap[key] || "lucide:activity";
};

const getCategoryTitle = (name) => {
  const translationKey = `stats.categories.${name}`;
  const translated = t(translationKey);
  return translated !== translationKey ? translated : name;
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(168, 85, 247, 0.4);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
