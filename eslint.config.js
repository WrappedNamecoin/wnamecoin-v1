import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.ts"],
    ignores: [
      "node_modules/**",
      ".eslintrc*",
      "artifacts/**",
      "cache/**",
      "constants/**",
      "coverage/**",
      "typechain-types/**",
      "lib/**",
      "config/.solcover-reference.js",
      "config/.solcover.js",
      "eslint.config.js",
    ],
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 12,
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      camelcase: ["error", {}],
      "object-shorthand": "error",
      "prefer-const": "error",
      "sort-imports": ["error", { ignoreDeclarationSort: true }],
    },
  },
  {
    files: ["test/**/*.spec.ts"],
    rules: {
      "no-unused-expressions": "off",
    },
  },
  {
    files: ["hardhat.config.ts", "scripts/**/*.ts"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        setTimeout: "readonly",
      },
    },
  },
  {
    files: ["test/**/*.ts"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
      },
    },
  },
];
