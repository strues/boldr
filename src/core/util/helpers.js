export function getDomSafeProps(props, ...args) {
  return args.length > 0 ? args.reduce((rest, fn) => ({ ...fn(rest) }), props) : props;
}

export function combineModifiers(props, ...args) {
  return args.length > 0 ? args.reduce((rest, fn) => ({ ...rest, ...fn(props) }), {}) : {};
}

export const isBetween = (min, max) => value => value >= min && value <= max;
export const is = options => str => options[str] || false;
export const isOption = (...fn) => str => fn.some(option => option(str));
