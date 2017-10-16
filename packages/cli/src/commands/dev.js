import { startDevServer } from '@boldr/tools';

function task() {
  try {
    startDevServer();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

function register(program) {
  program
    .command('develop', 'Start development server')
    .alias('dev')
    .action(task);
}

export default { register };
