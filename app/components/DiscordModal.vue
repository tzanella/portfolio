<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      @click="close"
    >
      <div
        class="glass max-w-lg w-full p-6 sm:p-8 relative flex flex-col gap-6 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(88,101,242,0.2)] max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <button
          @click="close"
          class="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          aria-label="Close"
        >
          <Icon name="lucide:x" class="w-5 h-5" />
        </button>

        <div class="flex items-center gap-3 pr-6">
          <div class="p-3 rounded-xl bg-[#5865F2]/10 text-[#5865F2] border border-[#5865F2]/20 flex items-center justify-center shrink-0">
            <Icon name="ic:baseline-discord" class="w-7 h-7" />
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-white font-poppins leading-snug">
            {{ t("discord_modal.title") }}
          </h3>
        </div>

        <div class="bg-white/5 border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col gap-3">
          <p class="text-sm text-slate-300 leading-relaxed">
            {{ t("discord_modal.description") }}
          </p>

          <a
            :href="t('discord_modal.nohello_link')"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-accent-purple transition-colors w-fit underline underline-offset-4 decoration-accent-blue/40 hover:decoration-accent-purple break-all"
          >
            <span>{{ t("discord_modal.nohello_link") }}</span>
            <Icon name="lucide:external-link" class="w-4 h-4 shrink-0" />
          </a>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            @click="close"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-all duration-200 order-2 sm:order-1"
          >
            {{ t("common.close") }}
          </button>
          <a
            :href="profileData.socials.discord"
            target="_blank"
            rel="noopener noreferrer"
            @click="close"
            class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-sm font-semibold flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_30px_rgba(88,101,242,0.6)] active:scale-[0.98] order-1 sm:order-2"
          >
            <Icon name="ic:baseline-discord" class="w-5 h-5" />
            <span>{{ t("discord_modal.send_button") }}</span>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { isOpen, close } = useDiscordModal();
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
