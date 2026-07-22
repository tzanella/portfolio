<template>
  <section id="skills" class="py-24 relative">
    <div class="container mx-auto px-6 lg:px-12">
      <h2
        class="text-3xl md:text-5xl font-bold mb-16 text-center font-poppins text-white"
      >
        {{ t("skills.title") }}
      </h2>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto"
      >
        <div
          v-for="cat in profileData.skills"
          :key="cat.category"
          class="glass p-6 flex flex-col gap-6"
        >
          <h3
            class="text-xl font-bold text-white border-b border-white/10 pb-3 font-poppins"
          >
            {{ t(`skills.categories.${cat.category}`) }}
          </h3>

          <div class="flex flex-col gap-3">
            <button
              v-for="skill in cat.items"
              :key="skill.name"
              @click="openSkillPopover(skill)"
              class="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-accent-purple/30 rounded-xl transition-all duration-300 text-left group"
            >
              <div
                class="text-accent-blue group-hover:text-accent-purple transition-colors"
              >
                <Icon :name="skill.icon" class="w-6 h-6" />
              </div>
              <span
                class="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors"
                >{{ skill.name }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>

    <SkillPopover
      :is-open="isPopoverOpen"
      :skill="selectedSkill"
      @close="closeSkillPopover"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";

const { t } = useI18n();

const isPopoverOpen = ref(false);
const selectedSkill = ref({});

const openSkillPopover = (skill) => {
  selectedSkill.value = skill;
  isPopoverOpen.value = true;
};

const closeSkillPopover = () => {
  isPopoverOpen.value = false;
};
</script>
