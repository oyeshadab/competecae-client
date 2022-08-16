const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [tailwindcss("./tailwind.config.js"), require("autoprefixer")],
};

// module.exports = {
//   plugins: {
//     tailwindcss: { config: "./tailwind.config.js" }, // or name of your tailwind config file
//     autoprefixer: {},
//   },
// };
