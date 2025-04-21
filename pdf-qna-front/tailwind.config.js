module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add this to make sure Tailwind looks for class names in your JS files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F7374F",
        secondary: "#88304E",
        tertiary: "#522546",
        background: "#2C2C2C",
      },
    },
  },
  plugins: [],
};
