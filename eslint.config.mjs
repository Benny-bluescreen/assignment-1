
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";


/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginJest.configs.recommended,
  pluginJs.configs.recommended,
];