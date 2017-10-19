// flow-typed signature: 1518672774af99a2afea8b3cdf970444
// flow-typed version: 48d02c1908/ms_v2.x.x/flow_>=v0.25.0

declare module 'ms' {
  declare type Options = {long?: boolean};

  declare module.exports: {
    (val: string|number, options?: Options): string|number;
  };
}
