<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{
      'bg-[#06030c] py-3 shadow-lg border-b border-white/5': scrolled,
      'py-6 bg-transparent': !scrolled,
    }"
  >
    <div
      class="container mx-auto px-6 lg:px-12 flex justify-between items-center"
    >
      <a
        href="#hero"
        class="text-2xl font-bold font-poppins text-white"
        @click.prevent="scrollTo('hero')"
      >
        xDUKE
      </a>

      <nav
        class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
      >
        <a
          href="#hero"
          @click.prevent="scrollTo('hero')"
          class="hover:text-white transition-colors"
          >{{ t("nav.home", "Home") }}</a
        >
        <a
          href="#about"
          @click.prevent="scrollTo('about')"
          class="hover:text-white transition-colors"
          >{{ t("nav.about") }}</a
        >
        <a
          href="#skills"
          @click.prevent="scrollTo('skills')"
          class="hover:text-white transition-colors"
          >{{ t("nav.skills") }}</a
        >
        <a
          href="#projects"
          @click.prevent="scrollTo('projects')"
          class="hover:text-white transition-colors"
          >{{ t("nav.projects") }}</a
        >
        <a
          href="#contact"
          @click.prevent="scrollTo('contact')"
          class="hover:text-white transition-colors"
          >{{ t("nav.contact") }}</a
        >

        <div class="relative lang-dropdown">
          <button
            @click="dropdownOpen = !dropdownOpen"
            class="flex items-center gap-2 px-3.5 py-1.5 bg-[#0d071a]/80 hover:bg-white/5 border border-white/10 rounded-full text-xs font-semibold transition-all duration-300 text-white"
          >
            <Icon :name="getCurrentLocaleIcon()" class="w-4 h-4 rounded-sm" />
            <span>{{ getCurrentLocaleName() }}</span>
            <Icon
              :name="dropdownOpen ? 'lucide:chevron-up' : 'lucide:chevron-down'"
              class="w-3.5 h-3.5 text-white/60"
            />
          </button>

          <Transition name="fade-slide">
            <div
              v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-40 bg-[#0d071a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col py-1"
            >
              <button
                v-for="loc in locales"
                :key="loc.code"
                @click="selectLanguage(loc.code)"
                class="flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-xs font-semibold transition-all text-slate-300 hover:text-white text-left w-full"
              >
                <Icon
                  :name="getLocaleIcon(loc.code)"
                  class="w-4 h-4 rounded-sm"
                />
                <span>{{ loc.name }}</span>
              </button>
            </div>
          </Transition>
        </div>
      </nav>

      <button
        class="md:hidden text-white hover:text-accent-purple"
        @click="mobileMenuOpen = !mobileMenuOpen"
      >
        <Icon
          :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
          class="w-6 h-6"
        />
      </button>
    </div>

    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-[#06030c] border-b border-white/5 absolute top-full left-0 w-full flex flex-col p-6 gap-4 shadow-xl"
    >
      <a
        href="#hero"
        @click.prevent="scrollTo('hero', true)"
        class="hover:text-white transition-colors text-lg font-semibold text-slate-350"
        >{{ t("nav.home", "Home") }}</a
      >
      <a
        href="#about"
        @click.prevent="scrollTo('about', true)"
        class="hover:text-white transition-colors text-lg font-semibold text-slate-350"
        >{{ t("nav.about") }}</a
      >
      <a
        href="#skills"
        @click.prevent="scrollTo('skills', true)"
        class="hover:text-white transition-colors text-lg font-semibold text-slate-350"
        >{{ t("nav.skills") }}</a
      >
      <a
        href="#projects"
        @click.prevent="scrollTo('projects', true)"
        class="hover:text-white transition-colors text-lg font-semibold text-slate-350"
        >{{ t("nav.projects") }}</a
      >
      <a
        href="#contact"
        @click.prevent="scrollTo('contact', true)"
        class="hover:text-white transition-colors text-lg font-semibold text-slate-350"
        >{{ t("nav.contact") }}</a
      >

      <div class="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/5">
        <button
          v-for="loc in locales"
          :key="loc.code"
          @click="selectLanguage(loc.code)"
          class="flex items-center justify-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:border-accent-purple/35 text-white"
          :class="{
            'border-accent-purple/50 bg-accent-purple/10': locale === loc.code,
          }"
        >
          <Icon :name="getLocaleIcon(loc.code)" class="w-4 h-4 rounded-sm" />
          <span>{{ loc.name }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const { t, locales, setLocale, locale: currentLocale } = useI18n();

const locale = ref(currentLocale.value);
const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const dropdownOpen = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

const getLocaleIcon = (code) => {
  const icons = {
    en: "circle-flags:us",
    pt: "circle-flags:br",
    es: "circle-flags:es",
    it: "circle-flags:it",
  };
  return icons[code] || "circle-flags:us";
};

const getCurrentLocaleIcon = () => {
  return getLocaleIcon(locale.value);
};

const getCurrentLocaleName = () => {
  const found = locales.value.find((l) => l.code === locale.value);
  return found ? found.name : "English";
};

const selectLanguage = (code) => {
  locale.value = code;
  setLocale(code);
  dropdownOpen.value = false;
};

const closeDropdown = (e) => {
  if (dropdownOpen.value && !e.target.closest(".lang-dropdown")) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("click", closeDropdown);
});

const scrollTo = (id, fromMobile = false) => {
  if (fromMobile) {
    mobileMenuOpen.value = false;
  }
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
