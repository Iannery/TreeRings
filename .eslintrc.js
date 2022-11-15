const tailwindConfig = require("./tailwind.config.js");
tailwindConfig.mode = "jit";

module.exports = {
  // Add this line
  settings: {
    tailwindcss: {
      config: tailwindConfig,
    },
  },

  extends: "next/core-web-vitals",
};
