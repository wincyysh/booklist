// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ignores: ["dist/", "node_modules/"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    extends: [
      js.configs.recommended,        // ESLint core rules
      react.configs.flat.recommended, // React plugin rules
      prettier                       // disables rules that conflict with Prettier
    ],
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+ doesn’t need React in scope
      "react/prop-types": "off",
    },
  },
]);
