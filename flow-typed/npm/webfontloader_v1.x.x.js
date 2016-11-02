// flow-typed signature: c26915bdda33fafde1b367adf7af6636
// flow-typed version: 94e9f7e0a4/webfontloader_v1.x.x/flow_>=v0.23.x

// @flow

declare module 'webfontloader' {
  declare type WebFontConfig = {
    loading?: () => mixed,
    active?: () => mixed,
    inactive?: () => mixed,

    fontloading?: (familyName: string, fvd: string) => mixed,
    fontactive?: (familyName: string, fvd: string) => mixed,
    fontinactive?: (familyName: string, fvd: string) => mixed,

    classes?: boolean,
    events?: boolean,

    timeouts?: number,

    custom?: {
      families: string[],
      urls: string[],
      testStrings: { [k: string]: string },
    },

    fontdeck?: {
      id: string,
    },

    monotype?: {
      projectId: string,
      version?: number,
    },

    google?: {
      families: string[],
      text?: string,
    },

    typekit?: {
      id: string,
    },
  }
  declare class WebFont {
    load(config: WebFontConfig): void;
  }

  declare var exports: WebFont;
}

