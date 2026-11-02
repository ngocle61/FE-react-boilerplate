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

const posix = (file) => file.replace(/\\/g, '/');

const hasChildComponents = (dir, name) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .some(
      (entry) =>
        entry.isDirectory() || (entry.name.endsWith('.tsx') && entry.name !== `${name}.tsx`),
    );

const splitModulePath = (file) => {
  const match = posix(file).match(/^(.*\/src\/modules\/[^/]+)\/(.*)$/);
  return match ? [match[1], match[2]] : null;
};

const componentFileSuffix = {
  meta: { type: 'problem', schema: [] },
  create(context) {
    return {
      Program(node) {
        const split = splitModulePath(context.filename);
        if (!split) return;

        const segments = split[1].split('/');
        if (segments.some((segment) => SUPPORT_DIRS.includes(segment))) return;

        const name = segments.pop().replace(/\.tsx$/, '');
        const folder = segments.at(-1) ?? split[0].split('/').pop();
        const dir = path.dirname(context.filename);
        const isComponent = segments.includes('components');

        if (segments.includes('shared')) {
          context.report({
            node,
            message: `Modules have no shared/ folder. A component rendered by several parents is a flat file: components/${name}.tsx.`,
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
    const split = splitModulePath(context.filename);
    if (!split) return {};
    const [, insideModule] = split;
    const fromSegments = insideModule.split('/');
    const fileName = fromSegments.pop().replace(/\.tsx$/, '');
    const fromDir = fromSegments.join('/');
    const isLeaf = fromSegments.includes('components') && fileName !== fromSegments.at(-1);

    const check = (node, request) => {
      if (!request.startsWith('.')) return;

      const resolved = [];
      for (const segment of [...fromDir.split('/').filter(Boolean), ...request.split('/')]) {
        if (segment === '.' || segment === '') continue;
        if (segment === '..') resolved.pop();
        else resolved.push(segment);
      }

      const target = resolved.join('/');
      if (!target) return;
      if (SUPPORT_DIRS.includes(resolved[0])) return;
      if (resolved.length === 2 && resolved[0] === 'components') return;
      if (fromDir === '') {
        if (resolved[0] === 'components') return;
      } else if (!isLeaf && target.startsWith(`${fromDir}/`)) {
        return;
      }

      context.report({
        node,
        message: `"${request}" leaves this branch of the component tree. A file may only import its own subtree, the shared flat files in components/, or module support code (${SUPPORT_DIRS.join(', ')}).`,
      });
    };

    return {
      ImportDeclaration: (node) => check(node, node.source.value),
      ExportNamedDeclaration: (node) => node.source && check(node, node.source.value),
      ImportExpression: (node) => node.source.type === 'Literal' && check(node, node.source.value),
    };
  },
};

export const naming = {
  meta: { name: 'naming' },
  rules: {
    'component-file-suffix': componentFileSuffix,
    'screen-import-scope': screenImportScope,
  },
};
