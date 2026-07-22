<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click="close"
    >
      <div
        class="glass max-w-4xl w-full p-8 relative flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <button
          @click="close"
          class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>

        <div class="flex flex-col gap-2">
          <h3 class="text-3xl font-bold text-white font-poppins">
            {{ t("about.certificates_modal_title") }}
          </h3>
          <p class="text-sm text-slate-400">
            Professional certifications and training completed.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div
            v-for="cert in profileData.certificates"
            :key="cert.title"
            class="bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:border-accent-purple/30 transition-all duration-300 flex flex-col"
          >
            <div class="h-40 bg-slate-950 overflow-hidden relative">
              <img
                :src="cert.imageUrl"
                :alt="cert.title"
                class="w-full h-full object-cover select-none"
                onerror="
                  this.src =
                    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400'
                "
              />
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between gap-4">
              <div class="flex flex-col gap-2">
                <h4
                  class="font-bold text-white font-poppins text-lg leading-snug"
                >
                  {{ cert.title }}
                </h4>
                <p class="text-xs text-slate-400 font-semibold">
                  {{ cert.institution }}
                </p>
              </div>
              <div
                class="flex justify-between items-center text-xs text-accent-blue font-bold"
              >
                <span>{{ cert.hours }}h workload</span>
                <a
                  :href="cert.imageUrl"
                  target="_blank"
                  class="hover:text-accent-purple transition-colors flex items-center gap-1"
                >
                  View Full
                  <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);
const close = () => emit("close");

const { t } = useI18n();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
