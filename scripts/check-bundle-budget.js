import { readFileSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const ROOT_DIR = path.resolve(import.meta.dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const MANIFEST_PATH = path.join(DIST_DIR, '.vite', 'manifest.json');
const BUDGET_PATH = path.join(ROOT_DIR, 'bundle-budget.json');
const BYTES_PER_KB = 1024;
const LARGEST_CHUNK_COUNT = 10;
const SIZE_DECIMALS = 1;
const STATUS = { OK: 'ok', OVER: 'OVER' };

const readJson = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'));

const gzipKb = (file) => gzipSync(readFileSync(path.join(DIST_DIR, file))).length / BYTES_PER_KB;

const collectStaticImports = (manifest, key, seen = new Set()) => {
  if (seen.has(key)) return seen;
  seen.add(key);
  for (const imported of manifest[key].imports ?? []) {
    collectStaticImports(manifest, imported, seen);
  }
  return seen;
};

const sumKb = (files) => files.reduce((total, file) => total + gzipKb(file), 0);

const filesOf = (manifest, keys) => [...keys].map((key) => manifest[key].file);

const cssOf = (manifest, keys) => [...new Set([...keys].flatMap((key) => manifest[key].css ?? []))];

const toCheck = (label, sizeKb, budgetKb) => ({
  label,
  sizeKb,
  budgetKb,
  status: sizeKb > budgetKb ? STATUS.OVER : STATUS.OK,
});

const formatKb = (value) => `${value.toFixed(SIZE_DECIMALS)} kB`;

const manifest = readJson(MANIFEST_PATH);
const budget = readJson(BUDGET_PATH);

const [entryKey] = Object.entries(manifest).find(([, chunk]) => chunk.isEntry) ?? [];
if (!entryKey) throw new Error(`No entry chunk in ${MANIFEST_PATH}. Run "npm run build" first.`);

const initialKeys = collectStaticImports(manifest, entryKey);

const lazyChecks = Object.entries(manifest)
  .filter(([, chunk]) => chunk.isDynamicEntry)
  .map(([key]) => {
    const ownKeys = [...collectStaticImports(manifest, key)].filter((k) => !initialKeys.has(k));
    return toCheck(`lazy  ${key}`, sumKb(filesOf(manifest, ownKeys)), budget.lazyChunkJsKb);
  })
  .sort((a, b) => b.sizeKb - a.sizeKb);

const checks = [
  toCheck('initial JS', sumKb(filesOf(manifest, initialKeys)), budget.initialJsKb),
  toCheck('initial CSS', sumKb(cssOf(manifest, initialKeys)), budget.initialCssKb),
  ...lazyChecks,
];

const largestChunks = Object.values(manifest)
  .filter((chunk) => chunk.file.endsWith('.js'))
  .map((chunk) => ({ file: chunk.file, sizeKb: gzipKb(chunk.file) }))
  .sort((a, b) => b.sizeKb - a.sizeKb)
  .slice(0, LARGEST_CHUNK_COUNT);

console.log('Bundle budget (gzip)');
console.table(
  checks.map(({ label, sizeKb, budgetKb, status }) => ({
    check: label,
    size: formatKb(sizeKb),
    budget: formatKb(budgetKb),
    status,
  })),
);
console.log(`Largest ${LARGEST_CHUNK_COUNT} JS chunks (gzip)`);
console.table(largestChunks.map(({ file, sizeKb }) => ({ file, size: formatKb(sizeKb) })));

const failures = checks.filter((check) => check.status === STATUS.OVER);
if (failures.length > 0) {
  console.error(
    `Bundle budget exceeded: ${failures.map((failure) => failure.label.trim()).join(', ')}`,
  );
  process.exit(1);
}
