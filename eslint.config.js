import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import eslintPluginImport from "eslint-plugin-import";

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
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      camelcase: ["error", {}],
      "import/order": [
        "error",
        {
          alphabetize: {
            order: "asc",
          },
          groups: ["object", ["builtin", "external"], "parent", "sibling", "index", "type"],
          "newlines-between": "always",
        },
      ],
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
