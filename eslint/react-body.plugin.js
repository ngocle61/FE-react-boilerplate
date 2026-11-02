export const STATEMENT_GROUPS = {
  STATE: 'state',
  HOOK: 'hook',
  DERIVED: 'derived',
  HANDLER: 'handler',
  EFFECT: 'effect',
  RETURN: 'return',
  OTHER: 'other',
};

const STATE_HOOKS = ['useState', 'useReducer', 'useRef'];
const DERIVED_HOOKS = ['useMemo', 'useDeferredValue'];
const HANDLER_HOOKS = ['useCallback', 'useEffectEvent'];
const EFFECT_HOOKS = ['useEffect', 'useLayoutEffect', 'useInsertionEffect', 'useImperativeHandle'];
const COMPACT_GROUPS = [STATEMENT_GROUPS.STATE, STATEMENT_GROUPS.HOOK];
const WRAPPER_TYPES = [
  'TSAsExpression',
  'TSNonNullExpression',
  'TSSatisfiesExpression',
  'AwaitExpression',
];
const FUNCTION_TYPES = ['ArrowFunctionExpression', 'FunctionExpression'];

const isHookName = (name) => /^use([A-Z]|$)/.test(name);
const isComponentName = (name) => /^[A-Z]/.test(name);

const unwrap = (node) =>
  node && WRAPPER_TYPES.includes(node.type) ? unwrap(node.expression ?? node.argument) : node;

const hookNameOf = (node) => {
  const call = unwrap(node);
  if (call?.type !== 'CallExpression') return null;
  const { callee } = call;
  const name = callee.type === 'MemberExpression' ? callee.property.name : callee.name;
  return name && isHookName(name) ? name : null;
};

const groupOfHook = (name) => {
  if (STATE_HOOKS.includes(name)) return STATEMENT_GROUPS.STATE;
  if (DERIVED_HOOKS.includes(name)) return STATEMENT_GROUPS.DERIVED;
  if (HANDLER_HOOKS.includes(name)) return STATEMENT_GROUPS.HANDLER;
  if (EFFECT_HOOKS.includes(name)) return STATEMENT_GROUPS.EFFECT;
  return STATEMENT_GROUPS.HOOK;
};

const groupOf = (statement) => {
  if (statement.type === 'ReturnStatement') return STATEMENT_GROUPS.RETURN;
  if (statement.type === 'FunctionDeclaration') return STATEMENT_GROUPS.HANDLER;
  if (statement.type === 'ExpressionStatement') {
    const hook = hookNameOf(statement.expression);
    return hook ? groupOfHook(hook) : STATEMENT_GROUPS.OTHER;
  }
  if (statement.type !== 'VariableDeclaration' || statement.declarations.length !== 1) {
    return STATEMENT_GROUPS.OTHER;
  }

  const init = unwrap(statement.declarations[0].init);
  const hook = hookNameOf(init);
  if (hook) return groupOfHook(hook);
  if (init && FUNCTION_TYPES.includes(init.type)) return STATEMENT_GROUPS.HANDLER;
  return STATEMENT_GROUPS.DERIVED;
};

const functionNameOf = (node) => {
  if (node.id) return node.id.name;
  if (node.parent.type === 'VariableDeclarator' && node.parent.id.type === 'Identifier') {
    return node.parent.id.name;
  }
  return null;
};

const statementGroups = {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    schema: [],
    messages: {
      missingBlankLine:
        'Separate the "{{previous}}" group from the "{{next}}" group with one blank line (order: state → hooks → derived values → handlers → effects → return).',
      extraBlankLine:
        'Keep "{{group}}" declarations together without blank lines, like an import group.',
    },
  },
  create(context) {
    const { sourceCode } = context;

    const fixGap = (previous, next, blankLines) => (fixer) => {
      const gap = sourceCode.text.slice(previous.range[1], next.range[0]);
      const indent = gap.slice(gap.lastIndexOf('\n') + 1);
      return fixer.replaceTextRange(
        [previous.range[1], next.range[0]],
        `${'\n'.repeat(blankLines + 1)}${indent}`,
      );
    };

    const check = (node) => {
      if (node.body.type !== 'BlockStatement') return;
      const name = functionNameOf(node);
      if (!name || !(isComponentName(name) || isHookName(name))) return;

      const statements = node.body.body;
      statements.slice(1).forEach((next, index) => {
        const previous = statements[index];
        if (sourceCode.getCommentsBefore(next).length > 0) return;

        const previousGroup = groupOf(previous);
        const nextGroup = groupOf(next);
        const blankLines = next.loc.start.line - previous.loc.end.line - 1;

        if (previousGroup !== nextGroup && blankLines !== 1) {
          context.report({
            node: next,
            messageId: 'missingBlankLine',
            data: { previous: previousGroup, next: nextGroup },
            fix: fixGap(previous, next, 1),
          });
          return;
        }

        if (previousGroup === nextGroup && COMPACT_GROUPS.includes(nextGroup) && blankLines > 0) {
          context.report({
            node: next,
            messageId: 'extraBlankLine',
            data: { group: nextGroup },
            fix: fixGap(previous, next, 0),
          });
        }
      });
    };

    return {
      FunctionDeclaration: check,
      FunctionExpression: check,
      ArrowFunctionExpression: check,
    };
  },
};

export const reactBody = {
  meta: { name: 'react-body' },
  rules: {
    'statement-groups': statementGroups,
  },
};
