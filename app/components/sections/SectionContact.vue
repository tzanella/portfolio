<template>
  <section id="contact" class="py-24 relative">
    <div class="container mx-auto px-6 lg:px-12">
      <h2
        class="text-3xl md:text-5xl font-bold mb-16 text-center font-poppins text-white"
      >
        {{ t("contact.title") }}
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        <div class="lg:col-span-5 flex flex-col gap-6">
          <div class="glass p-8 flex flex-col gap-8 h-full justify-between">
            <div class="flex flex-col gap-2">
              <h3 class="text-2xl font-bold font-poppins text-white">
                {{ t("contact.info_title") }}
              </h3>
              <p class="text-sm text-slate-400">
                {{ t("contact.subtitle") }}
              </p>
            </div>

            <div class="flex flex-col gap-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20"
                >
                  <Icon name="lucide:mail" class="w-5 h-5" />
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs text-slate-450 uppercase tracking-wider font-semibold"
                    >{{ t("contact.email") }}</span
                  >
                  <a
                    :href="`mailto:${profileData.contact.email}`"
                    class="text-white hover:text-accent-blue transition-colors font-medium"
                    >{{ profileData.contact.email }}</a
                  >
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple border border-accent-purple/20"
                >
                  <Icon name="fa6-brands:whatsapp" class="w-5 h-5" />
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs text-slate-450 uppercase tracking-wider font-semibold"
                    >{{ t("contact.phone") }}</span
                  >
                  <a
                    :href="`https://wa.me/${profileData.contact.phone.replace(/\D/g, '')}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-white hover:text-green-400 transition-colors font-medium"
                  >
                    {{ profileData.contact.phone }}
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-full bg-accent-blue/10 flex items-center justify-center text-accent-blue border border-accent-blue/20"
                >
                  <Icon name="lucide:map-pin" class="w-5 h-5" />
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs text-slate-450 uppercase tracking-wider font-semibold"
                    >{{ t("contact.location") }}</span
                  >
                  <span class="text-white font-medium">{{
                    profileData.contact.location
                  }}</span>
                </div>
              </div>
            </div>

            <div class="text-xs text-slate-500 font-medium">
              {{ t("contact.response_time") }}
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="glass p-8 md:p-10">
            <form @submit.prevent="submitForm" class="flex flex-col gap-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col gap-2">
                  <label
                    for="name"
                    class="text-sm font-semibold text-slate-300"
                    >{{ t("contact.name") }}</label
                  >
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    required
                    class="bg-space-dark/60 border border-white/5 focus:border-accent-purple/40 rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-white font-sans"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label
                    for="email"
                    class="text-sm font-semibold text-slate-300"
                    >{{ t("contact.email_label") }}</label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    class="bg-space-dark/60 border border-white/5 focus:border-accent-purple/40 rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-white font-sans"
                  />
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <label
                  for="subject"
                  class="text-sm font-semibold text-slate-300"
                  >{{ t("contact.subject") }}</label
                >
                <input
                  type="text"
                  id="subject"
                  v-model="form.subject"
                  required
                  class="bg-space-dark/60 border border-white/5 focus:border-accent-purple/40 rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-white font-sans"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label
                  for="message"
                  class="text-sm font-semibold text-slate-300"
                  >{{ t("contact.message") }}</label
                >
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="bg-space-dark/60 border border-white/5 focus:border-accent-purple/40 rounded-xl px-4 py-3.5 focus:outline-none transition-colors text-white resize-none font-sans"
                ></textarea>
              </div>

              <div
                class="flex flex-col md:flex-row items-center justify-between gap-6 mt-2"
              >
                <NuxtTurnstile v-model="form.token" :site-key="siteKey" />

                <button
                  type="submit"
                  :disabled="isSubmitting || !form.token"
                  class="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Icon
                    v-if="isSubmitting"
                    name="lucide:loader-2"
                    class="w-5 h-5 animate-spin"
                  />
                  <Icon v-else name="lucide:send" class="w-5 h-5" />
                  {{ t("contact.send") }}
                </button>
              </div>

              <div
                v-if="statusMessage"
                :class="`p-4 rounded-xl text-center text-sm font-medium ${statusType === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`"
              >
                {{ statusMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const { t } = useI18n();
const config = useRuntimeConfig();
const siteKey = config.public.turnstileSiteKey;

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
  token: "",
});

const isSubmitting = ref(false);
const statusMessage = ref("");
const statusType = ref("");

const submitForm = async () => {
  if (!form.value.token) return;

  isSubmitting.value = true;
  statusMessage.value = "";

  try {
    const res = await $fetch("/api/contact", {
      method: "POST",
      body: form.value,
    });

    if (res.success) {
      statusType.value = "success";
      statusMessage.value = t("contact.success");
      form.value = { name: "", email: "", subject: "", message: "", token: "" };
    } else {
      throw new Error();
    }
  } catch (error) {
    statusType.value = "error";
    statusMessage.value = t("contact.error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
