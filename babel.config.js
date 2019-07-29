/* eslint-disable import/no-commonjs */
const envConfig = {
  useBuiltIns: false,
  targets:
    process.env.NODE_ENV === "test"
      ? {
          node: "current",
        }
      : {
          browsers: "last 2 versions",
        },
};

// prettier-ignore
module.exports = {
  presets: [["@babel/preset-env", envConfig], "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from"
  ],
};
