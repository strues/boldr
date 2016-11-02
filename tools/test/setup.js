require('babel-register')();
require('events').EventEmitter.defaultMaxListeners = Infinity;
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiEnzyme = require('chai-enzyme');
const chaiAsPromised = require('chai-as-promised');

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();
