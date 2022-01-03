tailwindConfig = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "-1px 4px 20px -6px rgba(0, 0, 0, 0.75)"
      },
      colors: {
        "orange-primary": "#DD6B20",
        "light-gray": "#21262D",
        "dark-gray": "#161B22",
        dark: "#0D1117", // is used for background
      }
    },
  },
  plugins: [],
}

module.exports = tailwindConfig;