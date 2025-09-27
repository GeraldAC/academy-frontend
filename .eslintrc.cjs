module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true, // Para permitir código Node (scripts de config/test)
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: "detect", // Detecta la versión de React instalada
    },
  },
  plugins: [
    "react", // Reglas adicionales para React
    "@typescript-eslint",
    //"react-hooks",
    //"import",
    //"jsx-a11y", // Accesibilidad
    "react-refresh", // Fast refresh de Vite
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    //"plugin:import/recommended",
    //"plugin:jsx-a11y/recommended",
    "prettier", // Prettier siempre al final para evitar conflictos
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  rules: {
    // Reglas de React
    "react/react-in-jsx-scope": "off", // React 17+ ya no requiere import React
    "react/prop-types": "off", // Usamos TS para tipado, no PropTypes
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

    // Reglas de TypeScript
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",

    // Reglas de imports
    // "import/order": [
    //   "error",
    //   {
    //     groups: [
    //       ["builtin", "external"],
    //       "internal",
    //       ["parent", "sibling", "index"],
    //     ],
    //     "newlines-between": "always",
    //   },
    // ],

    // Accesibilidad
    // "jsx-a11y/no-autofocus": "warn",

    // Código limpio
    // "no-console": ["warn", { allow: ["warn", "error"] }],
  },
};
