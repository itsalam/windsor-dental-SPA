module.exports = {
  extends: [
    // add more generic rule sets here, such as:
    "eslint:recommended",
    "plugin:svelte/recommended",
  ],
  overrides: [
    {
      files: ["*.svelte"],
    },
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'svelte/rule-name': 'error'
  },
};
