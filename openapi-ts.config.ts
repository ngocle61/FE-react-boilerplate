import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../BE-nestjs-boilerplate/openapi.json',
  output: { path: 'src/core/contract' },
  plugins: ['zod'],
});
