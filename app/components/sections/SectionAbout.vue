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

         <!-- <div>
            <button
              @click="isCertModalOpen = true"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
            >
              <Icon name="lucide:award" class="w-5 h-5" />
              {{ t("about.certificates") }}
            </button>
          </div> -->

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
            <a
              :href="profileData.socials.discord"
              target="_blank"
              rel="noopener noreferrer"
              class="p-3 bg-[#0e0720]/80 rounded-xl hover:bg-white/10 text-slate-300 hover:text-[#5865F2] border border-white/5 transition-all duration-300"
            >
              <Icon name="ic:baseline-discord" class="w-6 h-6" />
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

const { t } = useI18n();
const isCertModalOpen = ref(false);
const actualAge = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  return year - profileData.personal.bornYear;
});
</script>
