function getQuestions() {
  return [{
    type: 'list',
    name: 'database',
    message: 'Choose a Postgres setup',
    choices: [{ name: 'Docker', value: 'docker' }, { name: 'External', value: 'external' }]
  }, {
    type: 'confirm',
    name: 'redis',
    message: 'Would you iike to use Redis?'
  }];
}

function makeOptions(answers) {
  var options = {
    database: answers.database,
    redis: answers.redis
  };

  if (answers.plugins.includes('auth')) {
    options.auth = true;
  }
  if (answers.plugins.includes('blog')) {
    options.blog = true;
  }

  return options;
}

export default { getQuestions: getQuestions, makeOptions: makeOptions };