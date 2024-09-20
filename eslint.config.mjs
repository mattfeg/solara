// eslint.config.mjs
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // Definir arquivos que usarão o TypeScript
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 'latest', // Definir a versão do ECMAScript
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      // Regras recomendadas do TypeScript ESLint
      ...typescriptEslint.configs.recommended.rules,
      // Suas regras personalizadas aqui
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"], // Definir arquivos que usarão o JavaScript
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // Regras recomendadas do ESLint
      ...js.configs.recommended.rules,
      // Suas regras personalizadas aqui
    },
  },
];