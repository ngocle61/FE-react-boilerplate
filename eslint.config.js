import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import importX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import { architecture } from './eslint/architecture.plugin.js';
import { naming } from './eslint/naming.plugin.js';
import { reactBody } from './eslint/react-body.plugin.js';

const ELEMENTS = [
  { type: 'core', pattern: 'src/core' },
  { type: 'ui', pattern: 'src/_widgets' },
  { type: 'shared', pattern: 'src/shared' },
  { type: 'module', pattern: 'src/modules/*', capture: ['name'] },
  { type: 'router', pattern: 'src/router' },
  { type: 'locale', pattern: 'src/locale' },
  { type: 'test', pattern: 'src/test' },
];

const APP_ENTRY_FILES = ['src/*.{ts,tsx}'];

const PROJECT_IMPORT_PATTERNS = ['@/**', '@ui', '@ui/**'];

const DESIGN_SYSTEM_DEEP_IMPORT = {
  group: ['@/_widgets/*'],
  message:
    'Import primitives from @ui and form fields from @ui/form, never a file inside src/_widgets (Rule 12).',
};

const CORE_ALIAS_IMPORT = {
  group: ['@/*'],
  message: 'Inside src/core, import other core files with relative paths (Rule 8).',
};

const RAW_HTTP_MESSAGE =
  'Call the server through an <entity>.api.ts in src/core/apis, so the response is parsed against the API contract (Rule 2).';

const RAW_HTTP_IMPORTS = ['axios', '@/core/apis/api-client', '@/core/apis/stream-client'].map(
  (name) => ({ name, message: RAW_HTTP_MESSAGE }),
);

const REACT_19_MESSAGE =
  'React 19 + React Compiler (Rule 22): pass ref as a prop, read context with use(), and let the compiler memoize.';

const APP_REACT_IMPORTS = {
  name: 'react',
  importNames: ['forwardRef', 'useContext', 'useMemo', 'useCallback', 'memo'],
  message: REACT_19_MESSAGE,
};

const PRIMITIVE_REACT_IMPORTS = {
  name: 'react',
  importNames: ['forwardRef', 'useContext'],
  message: REACT_19_MESSAGE,
};

const RHF_CONTROLLER_IMPORT = {
  name: 'react-hook-form',
  importNames: ['Controller'],
  message:
    'Screens never render a Controller (Rule 23). Use a field from @ui/form, or add one there.',
};

const forbid = (from, to, message) => ({
  from: { element: { type: from } },
  disallow: { to: { element: { types: { anyOf: to } } } },
  message,
});

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'src/core/contract', '.qa']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite(),
      jsxA11y.configs.recommended,
    ],
    plugins: { 'import-x': importX },
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      'jsx-a11y-x/no-autofocus': ['error', { ignoreNonDOM: true }],
      'import-x/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          pathGroups: PROJECT_IMPORT_PATTERNS.map((pattern) => ({ pattern, group: 'internal' })),
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.app.json' },
      },
      'boundaries/elements': ELEMENTS,
      'boundaries/ignore': APP_ENTRY_FILES,
    },
    rules: {
      'boundaries/no-unknown-files': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            forbid(
              'ui',
              ['core', 'shared', 'module', 'router'],
              'src/_widgets holds design-system primitives only. Pass data in through props.',
            ),
            forbid(
              'core',
              ['ui', 'shared', 'module', 'router'],
              'src/core must stay framework-level. Move UI to src/shared and features to src/modules.',
            ),
            forbid(
              'shared',
              ['module', 'router'],
              'src/shared cannot depend on a feature module or the router.',
            ),
            forbid(
              'module',
              ['module', 'router'],
              'A module cannot import another module or the router. Move shared code to src/shared.',
            ),
          ],
        },
      ],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-body': reactBody },
    rules: {
      'react-body/statement-groups': 'error',
    },
  },
  {
    files: ['src/modules/**/*.tsx'],
    plugins: { naming },
    rules: {
      'naming/component-file-suffix': 'error',
      'naming/screen-import-scope': 'error',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { architecture },
    rules: {
      'architecture/no-barrel-file': 'error',
      'architecture/no-module-apis': 'error',
      'architecture/spec-location': 'error',
      'import-x/no-default-export': 'error',
    },
  },
  {
    files: ['src/test/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [DESIGN_SYSTEM_DEEP_IMPORT] }],
    },
  },
  {
    files: ['src/_widgets/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { paths: [PRIMITIVE_REACT_IMPORTS] }],
    },
  },
  {
    files: ['src/core/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: [APP_REACT_IMPORTS], patterns: [DESIGN_SYSTEM_DEEP_IMPORT, CORE_ALIAS_IMPORT] },
      ],
    },
  },
  {
    files: ['src/modules/**/*.{ts,tsx}', 'src/shared/**/*.{ts,tsx}', 'src/router/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [...RAW_HTTP_IMPORTS, APP_REACT_IMPORTS, RHF_CONTROLLER_IMPORT],
          patterns: [DESIGN_SYSTEM_DEEP_IMPORT],
        },
      ],
    },
  },
  {
    files: ['src/_widgets/ui/**', 'src/_widgets/hooks/**'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  {
    files: ['src/router/**', 'src/test/**', 'src/**/*.spec.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]);
