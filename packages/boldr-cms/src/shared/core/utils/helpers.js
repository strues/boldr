/* eslint-disable no-param-reassign */
import { STATUS } from '../constants';
/**
 * Gets the current field for a component that can the field
 * as either uncontrolled or controlled.
 *
 * @param {Object} props - the props object.
 * @param {Object} state = the state object.
 * @param {string=} field - the field to extract a value from. Defaults to 'value'.
 *
 * @return the field's value.
 */
export function getField(props, state, field = 'value') {
  return typeof props[field] !== 'undefined' ? props[field] : state[field];
}

export function setOverflow(enabled, selector) {
  const el = selector ? document.querySelector(selector) : document.body;
  if (enabled) {
    el.classList.add('hide-overflow');
  } else {
    el.classList.remove('hide-overflow');
  }
}

/**
 * Checkis of the given thing is an object
 * @param thing the thing to check
 * @return true if the thing is an object
 */
export function isObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]';
}

function getScrollProp(key) {
  // document.body is deprecated for some browsers
  return Math.max(document.body[key], document.documentElement[key]);
}

export function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScrollProp('scrollLeft'),
    top: rect.top + getScrollProp('scrollTop'),
  };
}

/**
 * Generates an object of an offsetX and offsetY from
 * a mouse or touch event.
 *
 * @param {Object} event The event to extract data from
 * @return {Object} an object holding the offsetX and offsetY of the event.
 */
export function getTouchOffset(event) {
  const el = event.target;
  const rect = el.getBoundingClientRect();
  const { clientX, clientY } = event.changedTouches ? event.changedTouches[0] : event;
  return {
    offsetX: clientX - rect.left,
    offsetY: clientY - rect.top,
  };
}

/**
 * Determines if a point is in a circle.
 *
 * @param {Number} cx the center X coordinate in the circle
 * @param {Number} cy the center Y coordinate in the circle
 * @param {Number} r the radius of the circle
 * @param {Number} x the x coordinate to check
 * @param {Number} y the y coordinate to check
 * @return {bool} true if the given x and y coordinates are in the circle.
 */
export function isPointInCircle(cx, cy, r, x, y) {
  const distance = Math.pow(cx - x, 2) + Math.pow(cy - y, 2);
  return distance <= Math.pow(r, 2);
}

/**
 * Takes an event, a container node, and a function to call if the clicked
 * element is not inside of the container node.
 *
 * @param {Object} event the click event
 * @param {Object} node the container node to compare against
 * @param {func} callback the function to call if the clicked element
 *    is not inside the container node
 */
export function onOutsideClick(event, node, callback) {
  let target = event.target;
  if (target === node) {
    return;
  }

  while (target.parentNode) {
    if (target === node) {
      return;
    }
    target = target.parentNode;
  }

  callback(event);
}

/**
 * Checks if touch events are in the browser.
 * @return {bool} true if it is a touch device
 */
export function isTouchDevice() {
  return typeof window !== 'undefined'
    && ('ontouchstart' in window || !!navigator.maxTouchPoints);
}

export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return document.documentElement.clientWidth < 768;
};

/**
 * Preload an image
 * @param {String} url url of image to load
 * @param {Function} onload Function called when image is loaded
 * @returns {void}
 */
export function preloadImage(url, onload) {
  const image = new Image();
  image.src = url;
  image.onload = onload;
  return image;
}

/**
 * Return values of an Object in an Array
 * @param {Object} obj
 * @returns {Array}
 */
export function mapObjectValues(obj) {
  const array = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      array.push(obj[key]);
    }
  }
  return array;
}
