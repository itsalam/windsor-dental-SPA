module.exports = {
  env: {
    browser: true,
    "shared-node-browser": true,
  },
  extends: [
    // add more generic rule sets here, such as:
    "eslint:recommended",
    "plugin:svelte/recommended",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ...
    extraFileExtensions: [".svelte"], // This is a required setting in `@typescript-eslint/parser` v4.24.0.
  },
  overrides: [
    {
      files: ["**/*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'svelte/rule-name': 'error'
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "svelte/html-closing-bracket-spacing": 1,
    "svelte/html-quotes": "off",
    "svelte/html-self-closing": 1,
    "svelte/indent": 1,
  },
};
