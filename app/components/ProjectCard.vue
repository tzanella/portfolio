<template>
  <div
    class="glass flex flex-col rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_35px_rgba(139,92,246,0.2)] transition-all duration-300 group"
  >
    <div class="h-18 overflow-hidden relative border-b border-white/5">
      <div
        v-if="project.type === 'github'"
        class="absolute top-4 right-4 px-3 py-1 bg-space-dark/80 backdrop-blur-md rounded-full text-xs font-semibold flex items-center gap-1 text-accent-purple border border-accent-purple/20"
      >
        <Icon name="lucide:star" class="w-3.5 h-3.5" />
        {{ project.stars }}
      </div>
    </div>

    <div class="p-6 flex-grow flex flex-col gap-4">
      <h3
        class="text-xl font-bold text-white font-poppins group-hover:text-accent-blue transition-colors"
      >
        {{ project.title }}
      </h3>

      <p class="text-slate-300 text-sm leading-relaxed line-clamp-3">
        {{
          te(`projects.descriptions.${project.title}`)
            ? t(`projects.descriptions.${project.title}`)
            : project.description || t("projects.no_description")
        }}
      </p>

      <div class="flex flex-wrap gap-2 mt-auto">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-3 py-1 bg-white/5 text-xs font-medium rounded-full text-slate-300"
        >
          {{ tag }}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-white/5">
        <button
          @click="showDetails = true"
          class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-center border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          {{ t("projects.view_details") }}
        </button>
        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-xs font-bold text-center text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300 flex items-center justify-center gap-1.5"
        >
          <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
          {{ t("projects.visit_project") }}
        </a>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="showDetails"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click="showDetails = false"
      >
        <div
          class="glass max-w-lg w-full p-8 relative flex flex-col gap-6"
          @click.stop
        >
          <button
            @click="showDetails = false"
            class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <Icon name="lucide:x" class="w-6 h-6" />
          </button>

          <div class="flex flex-col gap-2">
            <h4 class="text-2xl font-bold text-white font-poppins">
              {{ project.title }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-3 py-1 bg-white/5 text-xs font-medium rounded-full text-slate-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <p class="text-slate-300 leading-relaxed font-sans text-sm">
            {{
              te(`projects.descriptions.${project.title}`)
                ? t(`projects.descriptions.${project.title}`)
                : project.description || t("projects.no_description")
            }}
          </p>

          <div class="flex justify-end gap-4 mt-2">
            <button
              @click="showDetails = false"
              class="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold border border-white/10 hover:border-white/20 transition-all"
            >
              {{ t("common.close") }}
            </button>
            <a
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-xs font-bold text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-1.5"
            >
              <Icon name="lucide:external-link" class="w-3.5 h-3.5" />
              {{ t("projects.visit_project") }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { t, te } = useI18n();

defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const showDetails = ref(false);
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
