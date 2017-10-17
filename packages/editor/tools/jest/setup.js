import { polyfill as rafPolyfill } from 'raf';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

rafPolyfill();

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
