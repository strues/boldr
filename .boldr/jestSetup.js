import { shallow, render, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

global.shallow = shallow;
global.render = render;
global.render = mount;
global.shallowToJson = shallowToJson;

console.error = message => {
  if (!/(React.createElement: type should not be null)/.test(message)) {
    throw new Error(message);
  }
};
window.matchMedia = function matchMedia() {
  return false;
};
