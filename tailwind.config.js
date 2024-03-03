function withOpacity(variableName) {
  return ({ opacityValue }) => (opacityValue !== undefined ? `rgba(var(${variableName}), ${opacityValue})` : `rgb(var(${variableName}))`);
}

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: withOpacity("--primary"),
      },
    },
  },
  plugins: [],
};
export default config;
