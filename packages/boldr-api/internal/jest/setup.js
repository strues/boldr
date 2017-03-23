import { EventEmitter } from 'events';
import { Model } from 'objection';
import db, { disconnect } from '../../src/services/postgres';

// Some of the `jest-runtime` tests are very slow and cause
// timeouts on travis
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

global.Promise = require('bluebird');

beforeAll(() => {
  Model.knex(db);
});

afterAll(() => {
  disconnect(db);
});

EventEmitter.defaultMaxListeners = Infinity;

global.Array = Array;
global.Date = Date;
global.Function = Function;
global.Math = Math;
global.Number = Number;
global.Object = Object;
global.RegExp = RegExp;
global.String = String;
global.Uint8Array = Uint8Array;
global.WeakMap = WeakMap;
global.Set = Set;
global.Error = Error;
global.TypeError = TypeError;
global.parseInt = parseInt;
global.parseFloat = parseFloat;
