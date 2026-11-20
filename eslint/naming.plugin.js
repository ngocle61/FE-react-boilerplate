import fs from 'node:fs';
import path from 'node:path';

export const COMPONENT_SUFFIXES = [
  'section',
  'header',
  'toolbar',
  'filters',
  'tabs',
  'dialog',
  'dialogs',
  'form',
  'table',
  'card',
  'step',
  'tab',
  'badge',
  'body',
  'footer',
  'row',
  'field',
  'fields',
  'banner',
  'banners',
  'button',
  'icon',
  'link',
  'preview',
  'panel',
  'list',
  'item',
];

export const SUPPORT_DIRS = [
  'hooks',
  'utils',
  'types',
  'converters',
  'services',
  'queries',
  'schema',
  'constants',
];

export const FOLDER_FILE_NAMES = {
  apis: { pattern: /^([a-z0-9-]+\.api|[a-z0-9-]+-client)\.ts$/, expected: '<entity>.api.ts' },
  constants: { pattern: /^[a-z0-9-]+\.constant\.ts$/, expected: '<name>.constant.ts' },
  converters: { pattern: /^[a-z0-9-]+\.converter\.ts$/, expected: '<name>.converter.ts' },
  guards: { pattern: /^[a-z0-9-]+-route\.tsx$/, expected: '<name>-route.tsx' },
  hooks: { pattern: /^use-[a-z0-9-]+\.tsx?$/, expected: 'use-<name>.ts' },
  interceptor: { pattern: /^[a-z0-9-]+\.interceptor\.ts$/, expected: '<name>.interceptor.ts' },
  loaders: {
    pattern: /^([a-z0-9-]+\.loader|create-[a-z0-9-]+-loader)\.ts$/,
    expected: '<module>.loader.ts',
  },
  queries: { pattern: /^[a-z0-9-]+\.queries\.ts$/, expected: '<entity>.queries.ts' },
  routes: { pattern: /^[a-z0-9-]+-routes\.ts$/, expected: '<module>-routes.ts' },
  schema: { pattern: /^[a-z0-9-]+\.schema\.ts$/, expected: '<name>.schema.ts' },
  services: { pattern: /^[a-z0-9-]+\.service\.ts$/, expected: '<name>.service.ts' },
  store: { pattern: /^[a-z0-9-]+\.store\.ts$/, expected: '<name>.store.ts' },
  types: { pattern: /^[a-z0-9-]+\.(type|dto|d)\.ts$/, expected: '<name>.type.ts' },
  utils: { pattern: /^[a-z0-9-]+\.util\.ts$/, expected: '<name>.util.ts' },
};

const EXPORT_SUFFIXES = {
  api: 'Api',
  service: 'Service',
  queries: 'Queries',
  converter: 'Converter',
};

const posix = (file) => file.replace(/\\/g, '/');

const toCamel = (kebab) => kebab.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());

const splitFeaturePath = (file) => {
  const match = posix(file).match(/^(.*\/src\/(modules|shared\/domains)\/[^/]+)\/(.*)$/);
  if (!match) return null;
  return { root: match[1], kind: match[2] === 'modules' ? 'module' : 'domain', inside: match[3] };
};

const isScreenSegment = (segment) => segment !== 'components' && !SUPPORT_DIRS.includes(segment);

const hasChildComponents = (dir, name) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .some(
      (entry) =>
        entry.isDirectory() || (entry.name.endsWith('.tsx') && entry.name !== `${name}.tsx`),
    );

const resolveRelative = (fromDir, request) => {
  const resolved = [];
  for (const segment of [...fromDir.split('/').filter(Boolean), ...request.split('/')]) {
    if (segment === '.' || segment === '') continue;
    if (segment === '..') resolved.pop();
    else resolved.push(segment);
  }
  return resolved;
};

const isPrefix = (prefix, segments) =>
  prefix.every((segment, index) => segments[index] === segment);

const isAncestorFlatComponent = (target, fromSegments) => {
  const at = target.lastIndexOf('components');
  if (at === -1 || target.length !== at + 2) return false;
  const owner = target.slice(0, at);
  return owner.every(isScreenSegment) && isPrefix(owner, fromSegments);
};

const isReachableSupport = (target, fromSegments) =>
  SUPPORT_DIRS.includes(target[0]) ||
  (SUPPORT_DIRS.includes(target[1]) && isScreenSegment(target[0]) && fromSegments[0] === target[0]);

const componentFileSuffix = {
  meta: { type: 'problem', schema: [] },
  create(context) {
    return {
      Program(node) {
        const split = splitFeaturePath(context.filename);
        if (!split) return;

        const segments = split.inside.split('/');
        if (segments.some((segment) => SUPPORT_DIRS.includes(segment))) return;

        const name = segments.pop().replace(/\.tsx$/, '');
        const folder = segments.at(-1) ?? split.root.split('/').pop();
        const dir = path.dirname(context.filename);
        const isComponent = segments.includes('components');

        if (segments.includes('shared')) {
          context.report({
            node,
            message: `Modules have no shared/ folder. A component rendered by several parents is a flat file in the components/ of the lowest screen that holds them all: components/${name}.tsx.`,
          });
          return;
        }

        if (split.kind === 'domain' && !isComponent) {
          context.report({
            node,
            message: `"${name}.tsx" sits outside components/. A domain slice in src/shared/domains has no pages; its components live in components/ (Rule 39).`,
          });
          return;
        }

        if (!isComponent && name !== folder) {
          context.report({
            node,
            message: `"${name}.tsx" is not a page. A page is named after its folder; components live in components/.`,
          });
          return;
        }

        if (isComponent && name === folder && !hasChildComponents(dir, name)) {
          context.report({
            node,
            message: `Component "${name}" renders no child component, so it gets no folder: move it to ../${name}.tsx.`,
          });
          return;
        }

        if (
          isComponent &&
          name !== folder &&
          folder !== 'components' &&
          !fs.existsSync(path.join(dir, `${folder}.tsx`))
        ) {
          context.report({
            node,
            message: `"${name}.tsx" sits in "${folder}/" but no ${folder}.tsx renders it. A leaf lives in the folder of the component that renders it.`,
          });
          return;
        }

        if (!isComponent) return;
        if (COMPONENT_SUFFIXES.some((suffix) => name === suffix || name.endsWith(`-${suffix}`)))
          return;

        context.report({
          node,
          message: `Component file "${name}" must end with a role suffix: ${COMPONENT_SUFFIXES.join(', ')}.`,
        });
      },
    };
  },
};

const screenImportScope = {
  meta: { type: 'problem', schema: [] },
  create(context) {
    const split = splitFeaturePath(context.filename);
    if (!split) return {};
    const fromSegments = split.inside.split('/');
    const fileName = fromSegments.pop().replace(/\.tsx$/, '');
    const fromDir = fromSegments.join('/');
    const isLeaf = fromSegments.includes('components') && fileName !== fromSegments.at(-1);

    const check = (node, request) => {
      if (!request.startsWith('.')) return;

      const target = resolveRelative(fromDir, request);
      if (target.length === 0) return;
      if (isReachableSupport(target, fromSegments)) return;
      if (isAncestorFlatComponent(target, fromSegments)) return;
      if (fromDir === '') {
        if (target[0] === 'components') return;
      } else if (!isLeaf && target.join('/').startsWith(`${fromDir}/`)) {
        return;
      }

      context.report({
        node,
        message: `"${request}" leaves this branch of the component tree. A file may only import its own subtree, the flat files in the components/ of a screen above it, or support code at the module root or in its own top-level screen (${SUPPORT_DIRS.join(', ')}).`,
      });
    };

    return {
      ImportDeclaration: (node) => check(node, node.source.value),
      ExportNamedDeclaration: (node) => node.source && check(node, node.source.value),
      ImportExpression: (node) => node.source.type === 'Literal' && check(node, node.source.value),
    };
  },
};

const supportFileName = {
  meta: { type: 'problem', schema: [] },
  create(context) {
    const file = posix(context.filename);
    const fileName = path.posix.basename(file);
    const folder = path.posix.basename(path.posix.dirname(file));
    const split = splitFeaturePath(file);

    const checkLocation = (node) => {
      if (!split) return;
      const segments = split.inside.split('/').slice(0, -1);
      const at = segments.findIndex((segment) => SUPPORT_DIRS.includes(segment));
      if (at === -1) return;
      const allowed =
        at === 0 || (split.kind === 'module' && at === 1 && isScreenSegment(segments[0]));
      if (allowed) return;
      context.report({
        node,
        message:
          split.kind === 'module'
            ? `"${segments[at]}/" sits too deep. Support folders live at the module root, or directly in a screen folder at the module root when only that screen's subtree uses them (Rule 28).`
            : `"${segments[at]}/" sits too deep. A domain slice keeps its support folders at its root (Rule 39).`,
      });
    };

    const checkFileName = (node) => {
      const rule = FOLDER_FILE_NAMES[folder];
      if (!rule) return;
      if (!rule.pattern.test(fileName)) {
        context.report({
          node,
          message: `Files in ${folder}/ are named ${rule.expected} (Rule 40). Rename "${fileName}".`,
        });
        return;
      }
      if (
        folder === 'types' &&
        fileName.endsWith('.dto.ts') &&
        !file.includes('/src/core/types/')
      ) {
        context.report({
          node,
          message: `DTOs live in src/core/types, inferred from the generated contract (Rule 37). Name a UI type <name>.type.ts.`,
        });
      }
    };

    const checkExportName = (node) => {
      const match = fileName.match(/^([a-z0-9-]+)\.(api|service|queries|converter)\.ts$/);
      if (!match) return;
      const expected = `${toCamel(match[1])}${EXPORT_SUFFIXES[match[2]]}`;
      const exported = node.body
        .filter((statement) => statement.type === 'ExportNamedDeclaration')
        .flatMap((statement) => statement.declaration?.declarations ?? [])
        .map((declaration) => declaration.id.name);
      if (exported.includes(expected)) return;
      context.report({
        node,
        message: `"${fileName}" exports its object as ${expected} (Rule 40).`,
      });
    };

    return {
      Program(node) {
        checkLocation(node);
        checkFileName(node);
        checkExportName(node);
      },
    };
  },
};

export const naming = {
  meta: { name: 'naming' },
  rules: {
    'component-file-suffix': componentFileSuffix,
    'screen-import-scope': screenImportScope,
    'support-file-name': supportFileName,
  },
};
