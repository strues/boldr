require('babel-register')();
const { EventEmitter } = require('events').EventEmitter;
import { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
global.shallow = shallow;
global.render = render;
global.render = mount;
global.shallowToJson = shallowToJson;
// Skip createElement warnings but fail tests on any other warning
console.error = message => {
    if (!/(React.createElement: type should not be null)/.test(message)) {
        throw new Error(message);
    }
};
EventEmitter.defaultMaxListeners = Infinity
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat
