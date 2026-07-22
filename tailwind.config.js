export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "space-dark": "#0a0514",
        "space-gradient-end": "#130b29",
        "accent-purple": "#8b5cf6",
        "accent-blue": "#3b82f6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        "star-drift": "drift 100s linear infinite",
        "star-drift-slow": "drift 150s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-2000px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
