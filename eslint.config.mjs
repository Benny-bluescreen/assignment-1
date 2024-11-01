
/** @type {import('eslint').Linter.Config[]} */
export default [
  // {pluginJs.configs.recommended,
  // pluginJest.configs.recommended
  // },

  {
    rules:
    {
      "no-semi": "error",
      "no-extra-semi": "error",
      "no-unused-vars": "error",
      "prefer-const": "error",
      "indent": ["error", 2]
    }
  }
];
