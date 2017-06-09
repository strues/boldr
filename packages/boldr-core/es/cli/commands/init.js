import execa from 'execa';
import express from 'express';
import logger from 'boldr-utils/lib/logger';
import _debug from 'debug';

// import createServer from '../../server';
import createDevDlls from '../../webpack/createDevDlls';
import handleError from '../../internal/handleError';

function getProjectConfig() {}
var debug = _debug('boldr:cli:dev');

function task(args, options) {
  return new Promise(function ($return, $error) {
    var dlls, app;
    return Promise.resolve(createDevDlls()).then(function ($await_4) {
      try {
        dlls = $await_4;
        app = express();
        return $return();
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this), $error);
  }.bind(this));
}
function getProjectEnvInfo() {
  return new Promise(function ($return, $error) {
    var answers;
    return Promise.resolve(inquirer.prompt({
      type: 'list',
      name: 'projectenv',
      message: 'Docker for daatabase and redis or external services?',
      choices: [{ value: 'docker', name: 'Use Docker' }, { value: 'external', name: 'Use external' }]
    })).then(function ($await_5) {
      try {
        answers = $await_5;
        return $return(answers.projectenv);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this), $error);
  }.bind(this));
}

function getEnvSetup(projectenv) {
  if (projectenv === 'docker') {
    return DockerSetup;
  }
  if (projectenv === 'external') {
    return ExternalSetup;
  }
}

function getOptions(projectenv) {
  return new Promise(function ($return, $error) {
    var envSetup, questions, answers;

    envSetup = getEnvSetup(projectenv);

    if (!envSetup) {
      return $return({});
    }

    questions = envSetup.getQuestions();
    return Promise.resolve(inquirer.prompt(questions)).then(function ($await_6) {
      try {
        answers = $await_6;

        return $return(envSetup.makeOptions(answers));
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this), $error);
  }.bind(this));
}

function handle(args, options, logger) {
  return new Promise(function ($return, $error) {
    var config;
    return Promise.resolve(getProjectConfig()).then(function ($await_7) {
      try {
        if ($await_7) {
          return $error(new Error('The project is already initialized'));
        }

        config = new ProjectConfig();

        return Promise.resolve(new Promise(function ($return, $error) {
          var $logicalOr_1;if (!($logicalOr_1 = args.projectenv)) {
            return Promise.resolve(getProjectEnvInfo()).then(function ($await_8) {
              try {
                $logicalOr_1 = $await_8;return $If_3.call(this);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          }
          function $If_3() {
            return $return($logicalOr_1);
          }

          return $If_3.call(this);
        }.bind(this))).then(function ($await_9) {
          try {
            config.projectenv = $await_9;

            return Promise.resolve(new Promise(function ($return, $error) {
              if (options.defaults) return $return(null);return Promise.resolve(getOptions(config.projectenv)).then($return, $error);
            }.bind(this))).then(function ($await_11) {
              try {
                config.options = $await_11;

                return Promise.resolve(config.save(process.cwd())).then(function ($await_12) {
                  try {

                    logger.info('Done.');
                    return $return();
                  } catch ($boundEx) {
                    return $error($boundEx);
                  }
                }.bind(this), $error);
              } catch ($boundEx) {
                return $error($boundEx);
              }
            }.bind(this), $error);
          } catch ($boundEx) {
            return $error($boundEx);
          }
        }.bind(this), $error);
      } catch ($boundEx) {
        return $error($boundEx);
      }
    }.bind(this), $error);
  }.bind(this));
}
function register(program) {
  program.command('init', 'Setup a fresh project.').help('tbd').option('-y, --defaults', 'Use default options', program.BOOL, false).option('--port <port>', 'port to run on').action(handleError(task));
}

export default { register: register };