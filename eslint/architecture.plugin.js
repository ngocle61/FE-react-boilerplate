const posix = (file) => file.replace(/\\/g, '/');

const BARREL_FILE = /\/src\/.*\/index\.tsx?$/;
const MODULE_APIS_DIR = /\/src\/modules\/[^/]+\/(.+\/)?apis\//;
const SPEC_FILE = /\.spec\.tsx?$/;
const TEST_DIR = '/src/test/';

const fileRule = (isViolation, message) => ({
  meta: { type: 'problem', schema: [] },
  create(context) {
    return {
      Program(node) {
        if (isViolation(posix(context.filename))) context.report({ node, message });
      },
    };
  },
});

export const architecture = {
  meta: { name: 'architecture' },
  rules: {
    'no-barrel-file': fileRule(
      (file) => BARREL_FILE.test(file),
      'No index.ts barrels (Rule 12). Name the file after what it exports and import it directly; widgets come from @ui or @ui/form.',
    ),
    'no-module-apis': fileRule(
      (file) => MODULE_APIS_DIR.test(file),
      'Modules have no apis/ folder (Rule 2). Put <entity>.api.ts in src/core/apis and its DTOs in src/core/types.',
    ),
    'spec-location': fileRule(
      (file) => SPEC_FILE.test(file) && !file.includes(TEST_DIR),
      'Specs never sit next to the code. Move this file under src/test/, mirroring the source path.',
    ),
  },
};
