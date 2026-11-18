import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export const FE_ROOT = path.resolve(import.meta.dirname, '..');

const JSON_INDENT = 2;
const LINTED_FILE = /\.tsx?$/;

const resolve = (file) => path.join(FE_ROOT, file);

const quote = (files) => files.map((file) => `"${file}"`).join(' ');

export const registerActions = (plop) => {
  plop.setActionType('patch', (_answers, { path: file, transform, data }) => {
    const absolute = resolve(file);
    fs.writeFileSync(absolute, transform(file, fs.readFileSync(absolute, 'utf8'), data));
    return file;
  });

  plop.setActionType('json', (_answers, { path: file, update, data }) => {
    const absolute = resolve(file);
    const current = fs.existsSync(absolute) ? JSON.parse(fs.readFileSync(absolute, 'utf8')) : {};
    fs.mkdirSync(path.dirname(absolute), { recursive: true });
    fs.writeFileSync(absolute, `${JSON.stringify(update(current, data), null, JSON_INDENT)}\n`);
    return file;
  });

  plop.setActionType('format', (_answers, { files }) => {
    const linted = files.filter((file) => LINTED_FILE.test(file));
    const run = (command) => execSync(command, { cwd: FE_ROOT, stdio: 'inherit' });

    run(`npx prettier --write ${quote(files)}`);
    run(`npx eslint --fix ${quote(linted)}`);
    run(`npx prettier --write ${quote(files)}`);
    return `${files.length} files formatted and linted`;
  });

  plop.setActionType('next-steps', (_answers, { steps }) =>
    ['Next steps:', ...steps.map((step, index) => `  ${index + 1}. ${step}`)].join('\n'),
  );
};
