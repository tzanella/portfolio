<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      @click="close"
    >
      <div
        class="glass max-w-md w-full p-8 relative flex flex-col gap-6"
        @click.stop
      >
        <button
          @click="close"
          class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <Icon name="lucide:x" class="w-6 h-6" />
        </button>

        <div class="flex items-center gap-4">
          <div class="p-3 bg-white/5 rounded-xl text-accent-purple">
            <Icon :name="skill.icon" class="w-10 h-10" />
          </div>
          <div>
            <h3 class="text-2xl font-bold text-white font-poppins">
              {{ skill.name }}
            </h3>
            <span class="text-sm font-semibold text-accent-blue"
              >{{ getProficiencyLabel(skill.level) }} {{ skill.level }}%</span
            >
          </div>
        </div>

        <div
          class="h-3 w-full bg-space-dark rounded-full overflow-hidden relative"
        >
          <div
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-purple to-accent-blue rounded-full transition-all duration-500"
            :style="{ width: `${skill.level}%` }"
          ></div>
        </div>

        <p class="text-slate-300 leading-relaxed font-sans">
          {{
            te(`skills.descriptions.${skill.name}`)
              ? t(`skills.descriptions.${skill.name}`)
              : skill.description
          }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { t, te } = useI18n();

defineProps({
  isOpen: Boolean,
  skill: Object,
});

const emit = defineEmits(["close"]);
const close = () => emit("close");

const getProficiencyLabel = (level) => {
  if (level >= 90) return t("skills.proficiency.expert");
  if (level >= 80) return t("skills.proficiency.advanced");
  if (level >= 60) return t("skills.proficiency.intermediate");
  return t("skills.proficiency.beginner");
};
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
