import { toNames } from '../names.js';

const EMPTY_CELL_SUFFIX = '_EMPTY_CELL';

const DATE_KIND = 'date';
const BOOLEAN_KIND = 'boolean';

export const isSelectableColumn = (field) =>
  field.key !== 'id' &&
  field.kind !== 'complex' &&
  !(field.kind === BOOLEAN_KIND && field.nullable);

const toCell = (field, emptyCell) => {
  const value = `row.${field.key}`;
  if (field.kind === DATE_KIND) {
    const formatted = `formatDate(${value}, i18n.language)`;
    return field.nullable ? `{${value} ? ${formatted} : ${emptyCell}}` : `{${formatted}}`;
  }
  if (field.kind === BOOLEAN_KIND)
    return `{${value} ? t('table.values.yes') : t('table.values.no')}`;
  return field.nullable ? `{${value} ?? ${emptyCell}}` : `{${value}}`;
};

const toRowType = (field, dtoType) => {
  if (field.kind === DATE_KIND) return field.nullable ? 'Nullable<Date>' : 'Date';
  return `${dtoType}['${field.key}']`;
};

const toConverterExpression = (field) => {
  const value = `dto.${field.key}`;
  if (field.kind !== DATE_KIND) return value;
  return field.nullable ? `${value} ? new Date(${value}) : null` : `new Date(${value})`;
};

export const buildData = (answers, operation) => {
  const module = toNames(answers.moduleName);
  const entity = toNames(answers.entityName);
  const resource = toNames(operation.apiPath.split('/').filter(Boolean)[0]);
  const emptyCell = `${module.constant}${EMPTY_CELL_SUFFIX}`;
  const dtoType = `${entity.pascal}ListItemDto`;

  const selected = operation.fields.filter((field) => answers.columnKeys.includes(field.key));
  const columns = selected.map((field) => ({
    key: field.key,
    label: toNames(field.key).title,
    cell: toCell(field, emptyCell),
    rowType: toRowType(field, dtoType),
    converter: toConverterExpression(field),
  }));

  const kinds = new Set(selected.map((field) => field.kind));
  const rowUsesDate = kinds.has(DATE_KIND);
  const rowUsesBoolean = kinds.has(BOOLEAN_KIND);
  const rowTranslation = [rowUsesBoolean && 't', rowUsesDate && 'i18n'].filter(Boolean).join(', ');

  return {
    module,
    entity,
    resource,
    operation: {
      apiPath: operation.apiPath,
      listSchema: `z${operation.listSchemaName}`,
      itemSchema: `z${operation.itemSchemaName}`,
      querySchema: `z${toNames(operation.operationId).pascal}Query`,
    },
    routePath: answers.routePath,
    permission: answers.permission,
    navigationGroup: answers.navigationGroup,
    icon: answers.icon,
    navigationLabelKey: `navigation.items.${module.camel}`,
    emptyCell,
    columns,
    columnCount: columns.length,
    rowUsesDate,
    rowUsesEmptyCell: selected.some((field) => field.nullable),
    rowTranslation,
    locale: {
      title: module.title,
      description: `Browse ${entity.words} records.`,
      empty: `No ${entity.words} records found.`,
      totalOne: '{{count}} record',
      totalOther: '{{count}} records',
      hasBooleans: rowUsesBoolean,
    },
  };
};
