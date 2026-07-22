<script setup lang="ts">
const { t } = useI18n()
const { shortCommit, commit, branch } = useBuildInfo()

const displayBranch = computed(() => branch || 'main')
const displayCommit = computed(() => shortCommit || commit?.slice(0, 7) || 'dev')
</script>

<template>
  <footer class="py-16 bg-[#06030c] border-t border-white/5 relative z-10">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div class="flex flex-col gap-4">
          <a
            href="#hero"
            class="text-2xl font-bold tracking-tighter text-white font-poppins"
          >
            X<span class="text-accent-purple">DUKE</span>
          </a>
          <p class="text-sm text-slate-400 leading-relaxed font-sans max-w-xs">
            {{ t("footer.bio") }}
          </p>
        </div>

        <div class="flex flex-col gap-4">
          <h4
            class="text-white font-bold font-poppins text-sm tracking-wider uppercase"
          >
            {{ t("footer.quick_links") }}
          </h4>
          <ul class="flex flex-col gap-2.5 text-sm text-slate-400">
            <li>
              <a
                href="#about"
                class="hover:text-accent-blue transition-colors"
                >{{ t("nav.about") }}</a
              >
            </li>
            <li>
              <a
                href="#skills"
                class="hover:text-accent-blue transition-colors"
                >{{ t("nav.skills") }}</a
              >
            </li>
            <li>
              <a
                href="#projects"
                class="hover:text-accent-blue transition-colors"
                >{{ t("nav.projects") }}</a
              >
            </li>
            <li>
              <a
                href="#contact"
                class="hover:text-accent-blue transition-colors"
                >{{ t("nav.contact") }}</a
              >
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h4
            class="text-white font-bold font-poppins text-sm tracking-wider uppercase"
          >
            {{ t("footer.contact_info") }}
          </h4>
          <ul class="flex flex-col gap-2.5 text-sm text-slate-400">
            <li class="flex items-center gap-2">
              <Icon name="lucide:mail" class="w-4 h-4 text-accent-blue" />
              <span>{{ profileData.contact.email }}</span>
            </li>
            <li class="flex items-center gap-2">
              <Icon name="lucide:map-pin" class="w-4 h-4 text-accent-purple" />
              <span>{{ profileData.contact.location }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h4
            class="text-white font-bold font-poppins text-sm tracking-wider uppercase"
          >
            {{ t("footer.follow_me") }}
          </h4>
          <div class="flex gap-3 mb-4">
            <a
              :href="profileData.socials.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#E1306C] border border-white/5 transition-all duration-300"
            >
              <Icon name="lucide:instagram" class="w-5 h-5" />
            </a>
            <a
              :href="profileData.socials.github"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition-all duration-300"
            >
              <Icon name="lucide:github" class="w-5 h-5" />
            </a>
            <a
              :href="profileData.socials.discord"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#5865F2] border border-white/5 transition-all duration-300"
            >
              <Icon name="ic:baseline-discord" class="w-5 h-5" />
            </a>
          </div>

          <div
            class="glass px-4 py-3 flex items-center gap-3 border-accent-blue/30 max-w-[200px]"
          >
            <Icon
              name="simple-icons:wakatime"
              class="text-accent-blue w-5 h-5 animate-pulse"
            />
            <div class="flex flex-col">
              <span
                class="text-[10px] text-slate-400 font-bold uppercase tracking-wider"
                >{{ t("footer.wakatime_stats") }}</span
              >
              <a
                :href="profileData.socials.wakatime"
                target="_blank"
                class="text-xs font-bold hover:text-accent-blue transition-colors text-white"
              >
                {{ t("footer.view_profile") }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500"
      >
        <p>
          © {{ new Date().getFullYear() }} Túlio Zanella.
          {{ t("footer.rights_reserved") }}
        </p>

        <div
          class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-accent-purple/40 backdrop-blur-md transition-all duration-300 group shadow-sm hover:shadow-accent-purple/10"
        >
          <div class="relative flex items-center justify-center">
            <span class="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
            <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <div class="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200 transition-colors">
            <Icon name="lucide:git-branch" class="w-3.5 h-3.5 text-accent-purple animate-pulse" />
            <span class="font-mono font-medium text-[11px] text-slate-300">{{ displayBranch }}</span>
          </div>
          <span class="text-slate-600">/</span>
          <div class="flex items-center gap-1 text-slate-400 group-hover:text-slate-200 transition-colors">
            <Icon name="lucide:git-commit" class="w-3.5 h-3.5 text-accent-blue" />
            <span class="font-mono font-medium text-[11px] text-accent-blue/90 group-hover:text-accent-blue transition-colors">
              {{ displayCommit }}
            </span>
          </div>
        </div>

        <p>{{ t("footer.built_with") }}</p>
      </div>
    </div>
  </footer>
</template>