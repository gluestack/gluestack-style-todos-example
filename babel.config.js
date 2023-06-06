const path = require("path");
const gluestackStyleResolver = require("@gluestack-style/babel-plugin-styled-resolver");
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // plugins: [gluestackStyleResolver],
  };
};
