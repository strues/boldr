/**
 * Helpers to enable Immutable-JS compatibility.
 */

export default function stringifiedArray(array) {
  return array.map(item => item && item.toString());
}
