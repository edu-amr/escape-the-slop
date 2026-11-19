import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/**",
    "components/PixelBlast.jsx",
  ]),
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      eqeqeq: ["error", "always"],
      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.{ts,tsx,jsx}"],
    plugins: { "better-tailwindcss": betterTailwindcss },
    settings: {
      "better-tailwindcss": { entryPoint: "app/globals.css" },
    },
    rules: {
      "better-tailwindcss/no-duplicate-classes": "error",
      "better-tailwindcss/no-conflicting-classes": "error",
      "better-tailwindcss/no-unnecessary-whitespace": "error",
      "better-tailwindcss/no-unknown-classes": "off",
    },
  },
  {
    files: ["components/**/*.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
  {
    files: ["scripts/**/*.mjs"],
    rules: { "no-console": "off" },
  },
  prettier,
]);
