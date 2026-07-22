<template>
  <div
    class="relative min-h-screen bg-space-dark text-slate-200 overflow-hidden font-sans selection:bg-accent-purple/40"
  >
    <div class="fixed inset-0 z-0 pointer-events-none">
      <div
        class="absolute inset-0 bg-gradient-to-b from-[#0a0514] to-[#130b29]"
      ></div>

      <div class="absolute top-0 left-0 w-full h-[200vh] flex flex-col">
        <div class="flex-1 w-full stars-pattern animate-star-drift"></div>
        <div class="flex-1 w-full stars-pattern animate-star-drift"></div>
      </div>

      <div class="absolute top-0 left-0 w-full h-[200vh] flex flex-col">
        <div
          class="flex-1 w-full stars-pattern-lg animate-star-drift-slow"
        ></div>
        <div
          class="flex-1 w-full stars-pattern-lg animate-star-drift-slow"
        ></div>
      </div>
    </div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <AppHeader />
      <main class="flex-grow">
        <slot />
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup></script>

<style>
.stars-pattern {
  background-image:
    radial-gradient(
      1px 1px at 20px 30px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1px 1px at 40px 70px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1.5px 1.5px at 50px 160px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1px 1px at 90px 40px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1px 1px at 130px 80px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      1.5px 1.5px at 160px 120px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    );
  background-repeat: repeat;
  background-size: 200px 200px;
}
.stars-pattern-lg {
  background-image:
    radial-gradient(
      2px 2px at 40px 60px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      2px 2px at 100px 120px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      2px 2px at 160px 40px,
      rgba(255, 255, 255, 0.8),
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(
      2px 2px at 200px 180px,
      rgba(255, 255, 255, 0.9),
      rgba(0, 0, 0, 0)
    );
  background-repeat: repeat;
  background-size: 300px 300px;
}
</style>
