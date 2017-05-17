import BoldrConfig from 'boldr-config';

const pkg = require('../../package.json');
const boldrConfig = require('../../.boldr/boldr.js');

const config = new BoldrConfig('boldr', boldrConfig);

export default config;
