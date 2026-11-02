import { registerActions } from './generators/actions.js';
import { listScreenGenerator } from './generators/list-screen/list-screen.generator.js';

export default function plopfile(plop) {
  registerActions(plop);
  listScreenGenerator(plop);
}
