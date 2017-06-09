import program from 'caporal';

import pkg from '../../package.json';
import dev from './commands/dev';

program.version(pkg.version);
dev.register(program);

program.parse(process.argv);