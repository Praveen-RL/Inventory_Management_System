module.exports = {
  // Map the conventional 'tailwindcss' plugin key to the new adapter so
  // Create React App / postcss-loader resolves it as expected.
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};