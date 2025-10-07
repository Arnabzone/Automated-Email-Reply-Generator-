import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended, // ✅ from @eslint/js, not eslint/config
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...js.environments.browser.globals,
        ...js.environments.node.globals,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react-hooks/rules-of-hooks": "error", // Enforce Hooks rules
      "react-hooks/exhaustive-deps": "warn", // Check effect deps
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
