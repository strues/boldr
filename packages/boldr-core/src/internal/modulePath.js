import path from 'path';
import nodeResolve from 'resolve';
import { map, uniq } from 'lodash';

const resolve = nodeResolve.sync;

const modulePath = initialPath => {
  // ensure that `start` is an absolute path at this point,
  // resolving against the process' current working directory
  const start = path.resolve(initialPath);
  console.log('initialPath: \n', initialPath);
  let parsed = path.parse(start);
  let limit = 0;
  console.log('parsed: \n', parsed);
  while (path.basename(parsed.dir) !== 'node_modules') {
    parsed = path.parse(parsed.dir);
    limit += 1;

    if (limit === 100) {
      parsed = false;
      break;
    }
  }

  if (parsed) {
    return parsed.dir;
  }

  return false;
};
console.log('input: \n', (input = []) => uniq(map(input, name => modulePath(resolve(name)))));
export default (input = []) => uniq(map(input, name => modulePath(resolve(name))));
