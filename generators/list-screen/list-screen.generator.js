import fs from 'node:fs';
import path from 'node:path';

import { FE_ROOT } from '../actions.js';
import {
  assertSchemasGenerated,
  findPaginatedListOperations,
  readContract,
  suggestEntityName,
} from '../contract.js';
import { KEBAB_CASE, toNames } from '../names.js';
import { buildData, isSelectableColumn } from './build-data.js';
import { NAVIGATION_LABEL_FILES, REGISTRY_PATCHES } from './patches.js';

const TEMPLATES = path.join(import.meta.dirname, 'templates');

const readConstantKeys = (file, objectName) => {
  const source = fs.readFileSync(path.join(FE_ROOT, file), 'utf8');
  const body = source.slice(source.indexOf(`export const ${objectName} = {`));
  return [...body.slice(0, body.indexOf('} as const')).matchAll(/^ {2}([A-Z_]+):/gm)].map(
    ([, key]) => key,
  );
};

const operations = () => findPaginatedListOperations(readContract());

const operationOf = ({ operationId }) =>
  operations().find((operation) => operation.operationId === operationId);

const exists = (file) => fs.existsSync(path.join(FE_ROOT, file));

const validateKebab = (value) => KEBAB_CASE.test(value) || 'Use kebab-case, e.g. product-catalog.';

const LUCIDE_ICONS = new Set(Object.keys(await import('lucide-react')));

const prompts = [
  {
    type: 'list',
    name: 'operationId',
    message:
      'Which paginated GET endpoint does the screen list? (from ../BE-nestjs-boilerplate/openapi.json)',
    choices: () =>
      operations().map((operation) => ({
        name: `${operation.operationId}  GET ${operation.apiPath}  → ${operation.itemSchemaName}`,
        value: operation.operationId,
      })),
  },
  {
    type: 'input',
    name: 'moduleName',
    message: 'Module folder (src/modules/<name>):',
    default: (answers) => `${toNames(operationOf(answers).tag).kebab}-list`,
    validate: (value) =>
      validateKebab(value) === true && exists(`src/modules/${value}`)
        ? `src/modules/${value} already exists.`
        : validateKebab(value),
  },
  {
    type: 'input',
    name: 'entityName',
    message: 'Entity name, singular (files <entity>.api.ts, <entity>.dto.ts, <entity>.service.ts):',
    default: (answers) => suggestEntityName(operationOf(answers).itemSchemaName),
    validate: (value) =>
      validateKebab(value) === true && exists(`src/core/types/${value}.dto.ts`)
        ? `src/core/types/${value}.dto.ts already exists. Pick another entity name.`
        : validateKebab(value),
  },
  {
    type: 'checkbox',
    name: 'columnKeys',
    message: 'Columns:',
    choices: (answers) =>
      operationOf(answers)
        .fields.filter(isSelectableColumn)
        .map((field) => ({
          name: `${field.key} (${field.kind}${field.nullable ? ', nullable' : ''})`,
          value: field.key,
          checked: true,
        })),
    validate: (value) => value.length > 0 || 'Pick at least one column.',
  },
  {
    type: 'input',
    name: 'routePath',
    message: 'Route path:',
    default: (answers) => `/${answers.moduleName}`,
    validate: (value) => value.startsWith('/') || 'A route path starts with "/".',
  },
  {
    type: 'list',
    name: 'permission',
    message: 'Permission required to open the screen:',
    choices: () => readConstantKeys('src/core/constants/permissions.constant.ts', 'PERMISSIONS'),
  },
  {
    type: 'list',
    name: 'navigationGroup',
    message: 'Sidebar group:',
    choices: () =>
      readConstantKeys('src/shared/constants/navigation-keys.constant.ts', 'NAVIGATION_GROUP_KEYS'),
  },
  {
    type: 'input',
    name: 'icon',
    message: 'lucide-react icon for the sidebar and the error view:',
    default: 'ListIcon',
    validate: (value) => LUCIDE_ICONS.has(value) || `lucide-react has no export named ${value}.`,
  },
];

const file = (target, template) => ({
  type: 'add',
  path: target,
  templateFile: path.join(TEMPLATES, template),
  abortOnFail: true,
});

const toLocale = (data, { empty, total, values }) => ({
  title: data.locale.title,
  description: data.locale.description,
  table: {
    columns: Object.fromEntries(data.columns.map((column) => [column.key, column.label])),
    empty,
    totalLabel_one: total.one,
    totalLabel_other: total.other,
    ...(data.locale.hasBooleans && { values }),
  },
});

const toActions = (answers) => {
  const operation = operationOf(answers);
  const data = buildData(answers, operation);
  assertSchemasGenerated([
    data.operation.itemSchema,
    data.operation.listSchema,
    data.operation.querySchema,
  ]);

  const { module, entity } = data;
  const moduleDir = `src/modules/${module.kebab}`;
  const tableDir = `${moduleDir}/components/${module.kebab}-table`;
  const bodyDir = `${tableDir}/${module.kebab}-table-body`;
  const testDir = `src/test/modules/${module.kebab}`;

  const files = [
    [`src/core/types/${entity.kebab}.dto.ts`, 'core-dto.ts.hbs'],
    [`src/core/apis/${entity.kebab}.api.ts`, 'core-api.ts.hbs'],
    [`${moduleDir}/${module.kebab}.tsx`, 'page.tsx.hbs'],
    [`${tableDir}/${module.kebab}-table.tsx`, 'table.tsx.hbs'],
    [`${bodyDir}/${module.kebab}-table-body.tsx`, 'table-body.tsx.hbs'],
    [`${bodyDir}/${module.kebab}-status-row.tsx`, 'status-row.tsx.hbs'],
    [`${bodyDir}/${module.kebab}-table-row.tsx`, 'table-row.tsx.hbs'],
    [`${moduleDir}/constants/query-keys.constant.ts`, 'query-keys.constant.ts.hbs'],
    [`${moduleDir}/constants/pagination.constant.ts`, 'pagination.constant.ts.hbs'],
    [`${moduleDir}/constants/${module.kebab}-table.constant.ts`, 'table.constant.ts.hbs'],
    [`${moduleDir}/converters/${entity.kebab}.converter.ts`, 'converter.ts.hbs'],
    [`${moduleDir}/queries/${entity.kebab}.queries.ts`, 'queries.ts.hbs'],
    [`${moduleDir}/services/${entity.kebab}.service.ts`, 'service.ts.hbs'],
    [`${moduleDir}/schema/${module.kebab}-search.schema.ts`, 'search.schema.ts.hbs'],
    [`${moduleDir}/types/${entity.kebab}-row.type.ts`, 'row.type.ts.hbs'],
    [`${moduleDir}/types/${module.kebab}-search.type.ts`, 'search.type.ts.hbs'],
    [`${moduleDir}/types/${module.kebab}-table.type.ts`, 'table.type.ts.hbs'],
    [`${moduleDir}/types/${module.kebab}-table-body.type.ts`, 'table-body.type.ts.hbs'],
    [`${moduleDir}/types/${module.kebab}-table-row.type.ts`, 'table-row.type.ts.hbs'],
    [`${moduleDir}/types/${module.kebab}-status-row.type.ts`, 'status-row.type.ts.hbs'],
    [`src/router/routes/${module.kebab}-routes.ts`, 'routes.ts.hbs'],
    [`src/router/loaders/${module.kebab}.loader.ts`, 'loader.ts.hbs'],
    [`${testDir}/converters/${entity.kebab}.converter.spec.ts`, 'converter.spec.ts.hbs'],
    [
      `${testDir}/components/${module.kebab}-table/${module.kebab}-table.spec.tsx`,
      'table.spec.tsx.hbs',
    ],
  ];

  const locales = [
    [
      `src/locale/${module.kebab}/en.json`,
      {
        empty: data.locale.empty,
        total: { one: data.locale.totalOne, other: data.locale.totalOther },
        values: { yes: 'Yes', no: 'No' },
      },
    ],
    [
      `src/locale/${module.kebab}/vi.json`,
      {
        empty: 'Không tìm thấy bản ghi nào.',
        total: { one: '{{count}} bản ghi', other: '{{count}} bản ghi' },
        values: { yes: 'Có', no: 'Không' },
      },
    ],
  ];

  const touched = [
    ...files.map(([target]) => target),
    ...locales.map(([target]) => target),
    ...REGISTRY_PATCHES.map((patch) => patch.path),
    ...NAVIGATION_LABEL_FILES,
  ];

  return [
    ...files.map(([target, template]) => ({ ...file(target, template), data })),
    ...locales.map(([target, texts]) => ({
      type: 'json',
      path: target,
      update: () => toLocale(data, texts),
      data,
    })),
    ...REGISTRY_PATCHES.map((patch) => ({ type: 'patch', ...patch, data })),
    ...NAVIGATION_LABEL_FILES.map((target) => ({
      type: 'json',
      path: target,
      update: (locale) => ({
        ...locale,
        navigation: {
          ...locale.navigation,
          items: { ...locale.navigation.items, [module.camel]: data.locale.title },
        },
      }),
      data,
    })),
    { type: 'format', files: touched },
    {
      type: 'next-steps',
      steps: [
        `Translate src/locale/${module.kebab}/vi.json and rename the column labels in both locale files.`,
        `Add ROUTE_PATHS.${module.constant} to the expectations in src/test/shared/utils/navigation.util.spec.ts for every role that holds ${data.permission}.`,
        'Run npm run verify, then npm run dev and open the screen from the sidebar.',
      ],
    },
  ];
};

export const listScreenGenerator = (plop) =>
  plop.setGenerator('list-screen', {
    description: 'Paginated list screen wired end to end from one BE endpoint (Rule 37)',
    prompts,
    actions: toActions,
  });
