import fs from 'node:fs';
import path from 'node:path';

export const OPENAPI_FILE = path.resolve(
  import.meta.dirname,
  '../../BE-nestjs-boilerplate/openapi.json',
);
export const ZOD_CONTRACT_FILE = path.resolve(
  import.meta.dirname,
  '../src/core/contract/zod.gen.ts',
);

const REF_PREFIX = '#/components/schemas/';
const PAGE_FIELDS = ['items', 'total', 'page', 'pageSize'];
const API_PREFIX = /^\/api(?=\/)/;
const SCHEMA_SUFFIXES = /(ListItem|Response|Item|Summary)$/;

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const refName = (schema) => schema?.$ref?.replace(REF_PREFIX, '');

const unwrapNullable = (schema) => {
  if (Array.isArray(schema.type) && schema.type.includes('null')) {
    const [type] = schema.type.filter((candidate) => candidate !== 'null');
    return { schema: { ...schema, type }, nullable: true };
  }

  const variants = schema.anyOf ?? [];
  const value = variants.find((variant) => variant.type !== 'null');
  const isNullable = variants.some((variant) => variant.type === 'null');
  return isNullable && value ? { schema: value, nullable: true } : { schema, nullable: false };
};

const toFieldKind = (schema) => {
  if (schema.enum) return 'enum';
  if (schema.type === 'string' && schema.format === 'date-time') return 'date';
  if (['string', 'number', 'integer', 'boolean'].includes(schema.type)) return schema.type;
  return 'complex';
};

const describeField = ([key, raw]) => {
  const { schema, nullable } = unwrapNullable(raw);
  return { key, kind: toFieldKind(schema), nullable, enumValues: schema.enum ?? [] };
};

const isPaginated = (schema) => {
  const keys = Object.keys(schema?.properties ?? {});
  return keys.length === PAGE_FIELDS.length && PAGE_FIELDS.every((key) => keys.includes(key));
};

export const readContract = () => {
  if (!fs.existsSync(OPENAPI_FILE)) {
    throw new Error(
      `${OPENAPI_FILE} is missing. Run "npm run openapi:generate" in ../BE-nestjs-boilerplate first.`,
    );
  }
  return readJson(OPENAPI_FILE);
};

export const findPaginatedListOperations = (document) => {
  const schemas = document.components?.schemas ?? {};

  return Object.entries(document.paths).flatMap(([route, methods]) => {
    const operation = methods.get;
    const listSchemaName = refName(
      operation?.responses?.['200']?.content?.['application/json']?.schema,
    );
    const listSchema = schemas[listSchemaName];
    if (!operation || !isPaginated(listSchema)) return [];

    const itemSchemaName = refName(listSchema.properties.items.items);
    const fields = Object.entries(schemas[itemSchemaName]?.properties ?? {}).map(describeField);
    if (!fields.some((field) => field.key === 'id')) return [];

    return [
      {
        operationId: operation.operationId,
        tag: operation.tags?.[0] ?? itemSchemaName,
        apiPath: route.replace(API_PREFIX, ''),
        listSchemaName,
        itemSchemaName,
        fields,
      },
    ];
  });
};

export const suggestEntityName = (itemSchemaName) =>
  itemSchemaName
    .replace(SCHEMA_SUFFIXES, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();

export const assertSchemasGenerated = (names) => {
  const source = fs.readFileSync(ZOD_CONTRACT_FILE, 'utf8');
  const missing = names.filter((name) => !source.includes(`export const ${name} =`));
  if (missing.length > 0) {
    throw new Error(
      `${missing.join(', ')} not found in src/core/contract/zod.gen.ts. Run "npm run api:generate" first.`,
    );
  }
};
