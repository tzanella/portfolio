<template>
  <section id="about" class="py-24 relative overflow-hidden">
    <div class="container mx-auto px-6 lg:px-12">
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto"
      >
        <div class="flex flex-col gap-6 order-2 md:order-1">
          <h2
            class="text-3xl md:text-5xl font-extrabold font-poppins text-white"
          >
            {{ t("about.title") }}
          </h2>

          <div
            class="text-2xl md:text-3xl font-bold font-poppins text-slate-100"
          >
            {{ profileData.personal.name }} /
            <span class="text-accent-purple">{{
              profileData.personal.nickname
            }}</span>
          </div>

          <div class="flex flex-col gap-1.5">
            <div
              class="text-sm font-semibold text-accent-blue tracking-wide uppercase"
            >
              {{ profileData.personal.role }}
            </div>
            <div class="text-xs font-medium text-slate-400">
              {{ t("about.age", { age: actualAge }) }} •
              {{ profileData.personal.location }}
            </div>
          </div>

          <p
            class="text-base md:text-lg text-slate-300 leading-relaxed font-sans"
          >
            {{ t("about.bio") }}
          </p>

          <div class="flex gap-4 items-center mt-4">
            <a
              :href="profileData.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 bg-[#0e0720]/80 rounded-xl hover:bg-white/10 text-slate-300 hover:text-[#E1306C] border border-white/5 transition-all duration-300"
            >
              <Icon name="lucide:instagram" class="w-6 h-6" />
            </a>
            <a
              :href="profileData.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 bg-[#0e0720]/80 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-all duration-300"
            >
              <Icon name="lucide:github" class="w-6 h-6" />
            </a>
            <a
              :href="profileData.socials.wakatime"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 bg-[#0e0720]/80 rounded-xl hover:bg-white/10 text-slate-300 hover:text-accent-blue border border-white/5 transition-all duration-300"
            >
              <Icon name="simple-icons:wakatime" class="w-6 h-6" />
            </a>
            <button
              @click="openDiscordModal"
              type="button"
              aria-label="Discord"
              class="p-3 bg-[#0e0720]/80 rounded-xl hover:bg-white/10 text-slate-300 hover:text-[#5865F2] border border-white/5 transition-all duration-300"
            >
              <Icon name="ic:baseline-discord" class="w-6 h-6" />
            </button>

            <a
              :href="profileData.socials.lastfm"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 bg-[#0e0720]/80 rounded-xl hover:bg-white/10 text-slate-300 hover:text-[#EA0000] border border-white/5 transition-all duration-300"
            >
              <Icon name="streamline-logos:lastfm-logo-block" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <div class="flex justify-center order-1 md:order-2">
          <div
            class="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
          >
            <div
              class="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-blue via-transparent to-accent-purple animate-spin"
              style="animation-duration: 8s"
            ></div>
            <div class="absolute inset-[3px] rounded-full bg-[#0a0514]"></div>

            <div
              class="relative w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-full overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
            >
              <img
                :src="`${profileData.socials.github}.png`"
                :alt="profileData.personal.name"
                class="w-full h-full object-cover select-none"
                onerror="
                  this.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
                "
              />
            </div>

            <a
              v-if="track?.isPlaying"
              :href="track.url || profileData.socials.lastfm"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute bottom-1 right-1 md:bottom-2 md:right-2 z-20 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a0514] border-2 border-accent-purple hover:border-accent-blue shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] transition-all duration-300 hover:scale-110 flex items-center justify-center p-0.5 group"
              :title="`${track.name} - ${track.artist}${track.album ? ' (' + track.album + ')' : ''}`"
            >
              <div class="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/80">
                <img
                  v-if="track.image"
                  :src="track.image"
                  :alt="track.name"
                  class="w-full h-full object-cover rounded-full group-hover:rotate-12 transition-transform duration-500"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-accent-purple/20 text-white">
                  <Icon name="streamline-logos:lastfm-logo-block" class="w-8 h-8 text-[#EA0000]" />
                </div>

                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>

                <div class="absolute bottom-1 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/20 flex items-center gap-0.5">
                  <span class="w-0.5 h-2 bg-accent-purple animate-bounce" style="animation-duration: 0.6s"></span>
                  <span class="w-0.5 h-3 bg-accent-blue animate-bounce" style="animation-duration: 0.8s"></span>
                  <span class="w-0.5 h-1.5 bg-emerald-400 animate-bounce" style="animation-duration: 0.5s"></span>
                </div>
              </div>

              <div
                class="absolute bottom-full right-0 mb-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap p-3 rounded-xl bg-[#0d071a]/95 border border-accent-purple/30 shadow-2xl backdrop-blur-xl flex flex-col gap-0.5"
              >
                <div class="flex items-center gap-1.5 text-[10px] uppercase font-bold text-accent-blue tracking-wider">
                  <Icon name="lucide:disc" class="w-3 h-3 animate-spin" />
                  <span>{{ t("lastfm.now_playing") }}</span>
                </div>
                <div class="font-bold text-xs text-white">{{ track.name }}</div>
                <div class="text-[11px] text-slate-300 font-medium">{{ track.artist }}</div>
                <div v-if="track.album" class="text-[10px] text-slate-400 italic">{{ track.album }}</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <CertificatesModal
      :is-open="isCertModalOpen"
      @close="isCertModalOpen = false"
    />
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useLastfm } from "~/composables/useLastfm";

const { t } = useI18n();
const { open: openDiscordModal } = useDiscordModal();
const { track } = useLastfm();

const isCertModalOpen = ref(false);
const actualAge = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  return year - profileData.personal.bornYear;
});
</script>
