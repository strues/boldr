import { startDevServer } from '@boldr/tools';

function register(program) {
  program
    .command('develop', 'Start development server')
    .alias('dev')
    .action(() => {
      try {
        startDevServer();
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    });
}

export default { register };
