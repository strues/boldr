import { merge, map, union, without, castArray } from 'lodash';

const combine = (modules, extractor) =>
  without(union(...map(modules, res => castArray(extractor(res)))), undefined);

export default class {
  // eslint-disable-next-line no-unused-vars
  constructor({ schema, createResolversFn, createContextFn }, ...modules) {
    this.schema = combine(...args, arg => arg.schema);
    this.createResolversFn = combine(...args, arg => arg.createResolversFn);
    this.createContextFn = combine(...args, arg => arg.createContextFn);
  }

  get schemas() {
    return this.schema;
  }

  createContext() {
    return merge({}, ...this.createContextFn.map(createContext => createContext()));
  }

  createResolvers(pubsub) {
    return merge({}, ...this.createResolversFunc.map(createResolvers => createResolvers(pubsub)));
  }
}
