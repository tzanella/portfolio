<template>
  <Transition name="preloader-fade">
    <div
      v-if="!isReady"
      class="fixed inset-0 z-[100] bg-[#06030c] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute inset-0 bg-gradient-to-b from-[#0a0514] via-[#06030c] to-[#130b29]"></div>

        <div class="absolute top-0 left-0 w-full h-full stars-pattern opacity-60"></div>
        <div class="absolute top-0 left-0 w-full h-full stars-pattern-lg opacity-80"></div>

        <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-[130px]"></div>
      </div>

      <div class="relative z-10 flex flex-col items-center gap-8 max-w-sm w-full px-6">
        <div class="relative flex items-center justify-center w-28 h-28">
          <div
            class="w-24 h-24 rounded-full border-4 border-purple-950/50 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent animate-spin shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            style="animation-duration: 1s;"
          ></div>

          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-12 h-12 rounded-full bg-[#0a0514] border border-purple-500/20 flex items-center justify-center shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]">
              <span class="text-base font-bold font-poppins text-white tracking-tight">
                x<span class="text-purple-500">D</span>
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center text-center gap-2">
          <div class="text-2xl font-bold tracking-tight text-white font-poppins">
            X<span class="text-purple-500">DUKE</span>
          </div>
          <p class="text-xs uppercase tracking-widest text-slate-300 font-semibold font-poppins">
            {{ t("preloader.loading_profile") }}
          </p>
        </div>

        <div class="w-48 bg-purple-950/40 h-1.5 rounded-full overflow-hidden border border-purple-500/20 relative">
          <div
            class="h-full bg-purple-600 rounded-full animate-pulse transition-all duration-300 w-full shadow-[0_0_10px_rgba(147,51,234,0.8)]"
          ></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useAppInit } from "~/composables/useAppInit";

const { t } = useI18n();
const { isReady } = useAppInit();
</script>

<style scoped>
.preloader-fade-enter-active,
.preloader-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.preloader-fade-enter-from,
.preloader-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

.stars-pattern {
  background-image:
    radial-gradient(
      1px 1px at 20px 30px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1px 1px at 40px 70px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1.5px 1.5px at 50px 160px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1px 1px at 90px 40px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    );
  background-repeat: repeat;
  background-size: 200px 200px;
}

.stars-pattern-lg {
  background-image:
    radial-gradient(
      2px 2px at 40px 60px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      2px 2px at 100px 120px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    );
  background-repeat: repeat;
  background-size: 300px 300px;
}
</style>
