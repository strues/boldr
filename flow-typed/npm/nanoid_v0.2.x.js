// flow-typed signature: 14bff10323629cec1007f13238a7c554
// flow-typed version: 3bafa6da2b/nanoid_v0.2.x/flow_>=v0.50.x

declare module 'nanoid' {
  declare module.exports: (size?: number) => string;
};

declare module 'nanoid/format' {
  declare module.exports: (random: (size: number) => string[], alphabet: string, size: number) => string;
};

declare module 'nanoid/generate' {
  declare module.exports: (alphabet: string, size: number) => string;
};

declare module 'nanoid/url' {
  declare module.exports: string;
};
