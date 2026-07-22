<template>
  <section
    id="hero"
    class="min-h-screen flex items-center justify-center pt-20 relative"
  >
    <div
      class="container mx-auto px-6 lg:px-12 flex flex-col items-center text-center z-10"
    >
      <h1
        class="text-6xl md:text-8xl lg:text-9xl font-black tracking-widest mb-6 font-poppins text-white select-none"
      >
        TÚLIO
      </h1>

      <p
        class="text-xl md:text-2xl text-slate-300 font-medium mb-16 tracking-wide max-w-lg"
      >
        {{ t("hero.subtitle_question") }}
      </p>

      <a
        href="#about"
        @click.prevent="scrollToAbout"
        class="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 glass hover:border-accent-purple/50 text-accent-purple hover:text-accent-blue transition-all duration-300 animate-bounce-slow shadow-[0_0_15px_rgba(139,92,246,0.2)]"
      >
        <Icon name="lucide:arrow-down" class="w-6 h-6" />
      </a>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();

const scrollToAbout = () => {
  const el = document.getElementById("about");
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
