const fail = (file, reason) => {
  throw new Error(
    `${file}: ${reason}. Update it by hand or fix the anchor in generators/list-screen/patches.js.`,
  );
};

const insertBefore = (file, text, anchor, insertion) => {
  const index = text.indexOf(anchor);
  if (index === -1) fail(file, `anchor not found:\n${anchor}`);
  return text.slice(0, index) + insertion + text.slice(index);
};

const insertBeforeLast = (file, text, anchor, insertion) => {
  const index = text.lastIndexOf(anchor);
  if (index === -1) fail(file, `anchor not found:\n${anchor}`);
  return text.slice(0, index) + insertion + text.slice(index);
};

const assertAbsent = (file, text, needle) => {
  if (text.includes(needle)) fail(file, `"${needle.trim()}" already exists`);
};

const addResourceEndpoint = (file, text, data) => {
  const key = `  ${data.resource.constant}: {`;
  const start = text.indexOf(key);
  if (start !== -1) {
    const block = text.slice(start, text.indexOf('\n  },', start));
    if (block.includes('BASE:')) return text;
    fail(file, `${data.resource.constant} exists without a BASE path`);
  }
  return insertBefore(
    file,
    text,
    '} as const;\n\nexport const PUBLIC_AUTH_ENDPOINTS',
    `  ${data.resource.constant}: {\n    BASE: '${data.operation.apiPath}',\n  },\n`,
  );
};

const addLucideIcon = (file, text, icon) => {
  const match = text.match(/import \{([^}]*)\} from 'lucide-react';/);
  if (!match) fail(file, 'lucide-react import not found');
  const icons = match[1]
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean);
  if (icons.includes(icon)) return text;
  return text.replace(match[0], `import { ${[...icons, icon].join(', ')} } from 'lucide-react';`);
};

const addNavigationItem = (file, text, data) => {
  const group = text.indexOf(`key: NAVIGATION_GROUP_KEYS.${data.navigationGroup},`);
  if (group === -1) fail(file, `navigation group ${data.navigationGroup} not found`);
  const end = text.indexOf('\n    ],', group);
  if (end === -1) fail(file, `items of ${data.navigationGroup} not found`);

  const item = [
    '\n      {',
    `        key: NAVIGATION_ITEM_KEYS.${data.module.constant},`,
    `        labelKey: NAVIGATION_ITEM_LABEL_KEYS.${data.module.constant},`,
    `        href: ROUTE_PATHS.${data.module.constant},`,
    `        icon: ${data.icon},`,
    `        access: ROUTE_ACCESS.${data.module.constant},`,
    '      },',
  ].join('\n');

  return text.slice(0, end) + item + text.slice(end);
};

export const REGISTRY_PATCHES = [
  {
    path: 'src/core/constants/api-endpoints.constant.ts',
    transform: addResourceEndpoint,
  },
  {
    path: 'src/core/constants/route-paths.constant.ts',
    transform: (file, text, data) => {
      assertAbsent(file, text, `  ${data.module.constant}:`);
      return insertBefore(
        file,
        text,
        '} as const;\n\nexport const REDIRECT_SEARCH_PARAM',
        `  ${data.module.constant}: '${data.routePath}',\n`,
      );
    },
  },
  {
    path: 'src/core/constants/route-access.constant.ts',
    transform: (file, text, data) => {
      assertAbsent(file, text, `  ${data.module.constant}:`);
      return insertBefore(
        file,
        text,
        '} as const satisfies Record<string, AccessRequirement>;',
        `  ${data.module.constant}: { permissions: [PERMISSIONS.${data.permission}] },\n`,
      );
    },
  },
  {
    path: 'src/core/constants/language.constant.ts',
    transform: (file, text, data) => {
      assertAbsent(file, text, `  ${data.module.constant}:`);
      return insertBefore(
        file,
        text,
        '} as const;\n\nexport const DEFAULT_NAMESPACE',
        `  ${data.module.constant}: '${data.module.kebab}',\n`,
      );
    },
  },
  {
    path: 'src/core/types/i18next.d.ts',
    transform: (file, text, data) => {
      const withImport = insertBefore(
        file,
        text,
        "\n\ndeclare module 'i18next'",
        `\nimport type ${data.module.camel} from '../../locale/${data.module.kebab}/en.json';`,
      );
      return insertBefore(
        file,
        withImport,
        '    };\n  }\n}',
        `      '${data.module.kebab}': typeof ${data.module.camel};\n`,
      );
    },
  },
  {
    path: 'src/router/routes.tsx',
    transform: (file, text, data) => {
      const withImport = insertBefore(
        file,
        text,
        '\n\nexport const routes',
        `\nimport { ${data.module.camel}Routes } from './routes/${data.module.kebab}-routes';`,
      );
      return insertBefore(
        file,
        withImport,
        "              { path: '*', element: <NotFoundPage /> },",
        `              ...${data.module.camel}Routes,\n`,
      );
    },
  },
  {
    path: 'src/shared/constants/navigation-keys.constant.ts',
    transform: (file, text, data) => {
      assertAbsent(file, text, `  ${data.module.constant}:`);
      const withKey = insertBefore(
        file,
        text,
        '} as const;\n\nexport const NAVIGATION_GROUP_LABEL_KEYS',
        `  ${data.module.constant}: '${data.module.camel}',\n`,
      );
      return insertBeforeLast(
        file,
        withKey,
        '} as const;',
        `  ${data.module.constant}: '${data.navigationLabelKey}',\n`,
      );
    },
  },
  {
    path: 'src/shared/constants/navigation.constant.ts',
    transform: (file, text, data) =>
      addNavigationItem(file, addLucideIcon(file, text, data.icon), data),
  },
];

export const NAVIGATION_LABEL_FILES = ['src/locale/common/en.json', 'src/locale/common/vi.json'];
