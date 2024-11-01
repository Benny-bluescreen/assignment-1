
/** @type {import('eslint').Linter.Config[]} */
export default [
  // {pluginJs.configs.recommended,
  // pluginJest.configs.recommended
  // },

  {
    rules:
    {
      "no-extra-semi": 'error',
      "no-unused-vars": "error",
      "prefer-const": "error",
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
    }
  }
];
