<template>
  <div
    class="glass p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(138,43,226,0.2)] group"
    @click="revealed = !revealed"
  >
    <div class="flex items-center gap-4 mb-4">
      <div
        class="p-3 bg-white/5 rounded-xl text-accent-blue group-hover:text-accent-purple transition-colors"
      >
        <Icon :name="skill.icon" class="w-8 h-8" />
      </div>
      <h3 class="text-xl font-bold">{{ skill.name }}</h3>
    </div>

    <div class="h-2 w-full bg-space-dark rounded-full overflow-hidden relative">
      <div
        class="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-purple to-accent-blue transition-all duration-1000 ease-out rounded-full"
        :style="{ width: revealed ? `${skill.level}%` : '0%' }"
      ></div>
    </div>

    <div
      class="mt-2 text-right text-sm text-slate-400 font-medium h-5 transition-opacity duration-300"
      :class="{ 'opacity-100': revealed, 'opacity-0': !revealed }"
    >
      {{ skill.level }}% Proficiency
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  skill: {
    type: Object,
    required: true,
  },
});

const revealed = ref(false);
</script>
