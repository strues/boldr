import Stack from '../../Stack';

const DB_HOST = 'database';
const DB_DATABASE = 'boldr';
const DB_USERNAME = 'postgres';
const DB_PASSWORD = 'password';
const DEFAULT_OPTIONS = {
  database: 'docker',
  redis: true,
};

export default class Project extends Boldr {
  constructor(options = {}) {
    super();
    this.setOptions(options);
    this.init();
  }
  setOptions(options) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }
  init() {
    this.initWebpackSetup();
    this.initDatabaseSetup();
    this.initRedisSetup();
  }
  initWebpackSetup() {
    this.services.set('project', {
      image: 'stacker/laravel:latest',
      shell: '/bin/bash',
      env: {
        DB_HOST,
        DB_DATABASE,
        DB_USERNAME,
        DB_PASSWORD,
      },
      ports: {
        80: 80,
      },
      volumes: ['.:/app'],
    });

    this.ejectables.set('apache2.conf', {
      label: 'Apache config',
      path: '/etc/apache2/apache2.conf',
      service: 'laravel',
    });
    this.ejectables.set('apache2-site.conf', {
      label: 'Apache virtual host',
      path: '/etc/apache2/site-available/app.conf',
      service: 'laravel',
    });

    this.runnables.set('apache-reload', {
      label: 'Reload Apache service',
      exec: 'service apache2 reload',
      service: 'laravel',
    });
    this.runnables.set('phpunit', {
      label: 'Run PHPUnit suite',
      exec: './vendor/bin/phpunit; exit $?',
      service: 'laravel',
    });
  }
  initDatabaseSetup() {
    if (this.options.database === 'docker') {
      return this.configureDocker();
    } else if (this.options.database === 'external') {
      return this.configureExternal();
    }
  }
  configureExternal() {
    this.services.set('database', {
      image: 'mysql:latest',
      shell: '/bin/bash',
      volumes: ['database_data:/var/lib/mysql'],
      env: {
        MYSQL_ROOT_PASSWORD: 'root',
        MYSQL_DATABASE: DB_DATABASE,
        MYSQL_USER: DB_USERNAME,
        MYSQL_PASSWORD: DB_PASSWORD,
      },
    });

    const laravelService = this.services.get('laravel');
    laravelService.env.set('DB_CONNECTION', 'mysql');
    laravelService.env.set('DB_PORT', 3306);

    this.ejectables.set('my.cnf', {
      label: 'MySQL config',
      path: '/etc/mysql/my.cnf',
      service: 'database',
    });

    this.volumes.set('database_data', {
      driver: 'local',
    });
  }
  configureDocker() {
    this.services.set('database', {
      image: 'postgres:latest',
      shell: '/bin/bash',
      volumes: ['database_data:/var/lib/postgresql/data'],
      env: {
        POSTGRES_DB: DB_DATABASE,
        POSTGRES_USER: DB_USERNAME,
        POSTGRES_PASSWORD: DB_PASSWORD,
      },
    });

    const laravelService = this.services.get('laravel');
    laravelService.env.set('DB_CONNECTION', 'pgsql');
    laravelService.env.set('DB_PORT', 5432);

    this.volumes.set('database_data', {
      driver: 'local',
    });
  }
  initRedisSetup() {
    if (this.options.redis === false) return;

    this.services.set('redis', {
      image: 'phpmyadmin/phpmyadmin:latest',
      shell: '/bin/bash',
      env: {
        PMA_HOST: DB_HOST,
        PMA_USER: DB_USERNAME,
        PMA_PASSWORD: DB_PASSWORD,
      },
      ports: {
        9999: 80,
      },
    });
  }
}
