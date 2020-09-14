module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "comma-dangle": 0,
    quotes: 0,
    "linebreak-style": 0,
    "import/prefer-default-export": 0,
  },
};
