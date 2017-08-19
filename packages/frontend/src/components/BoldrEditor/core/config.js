// @flow

export type StyleConfig = {
  label: string,
  style: string,
  className?: string,
};
export type ToolbarOption =
  | 'inline'
  | 'blockType'
  | 'fontSize'
  | 'fontFamily'
  | 'list'
  | 'textAlign'
  | 'colorPicker'
  | 'link'
  | 'embedded'
  | 'emoji'
  | 'image'
  | 'remove'
  | 'history';
export type ToolbarOptionsList = Array<ToolbarOption>;

export type ConfigItemOption = {
  className?: string,
  title: string,
};

export type FontSizeConfig = {
  options: Array<number>,
  className?: string,
  dropdownClassName?: string,
  title: string,
};
export type FontFamilyConfig = {
  options: Array<string>,
  className?: string,
  dropdownClassName?: string,
  title: string,
};
export type ListConfig = {
  className?: string,
  unordered: ConfigItemOption,
  ordered: ConfigItemOption,
  indent: ConfigItemOption,
  outdent: ConfigItemOption,
  title: string,
};
export type LinkVariations = 'link' | 'unlink';
export type LinkConfig = {
  className?: string,
  modalClassName?: string,
  dropdownClassName?: string,
  showOpenOptionOnHover: boolean,
  defaultTargetOption: '_self' | 'blank',
  options: Array<LinkVariations>,
  link: ConfigItemOption,
  unlink: ConfigItemOption,
};

export type DefaultSize = {
  height: 'auto' | number,
  width: 'auto' | number,
};

export type EmbeddedConfig = {
  className?: string,
  modalClassName?: string,
  defaultSize: DefaultSize,
  title: string,
};
export type ImageConfig = {
  className?: string,
  modalClassName?: string,
  urlEnabled?: boolean,
  uploadEnabled?: boolean,
  alignmentEnabled?: boolean,
  uploadCallback?: Function,
  inputAccept?: string,
  defaultSize?: DefaultSize,
  title?: string,
};
export type RemoveConfig = {
  className?: string,
  title?: string,
};
export type HistoryConfig = {
  className?: string,
  title?: string,
  undo: ConfigItemOption,
  redo: ConfigItemOption,
};
export type ColorPickerConfig = {
  className?: string,
  modalClassName?: string,
  title?: string,
  colors?: Array<string>,
};
export type EmojiConfig = {
  className?: string,
  modalClassName?: string,
  title?: string,
  emojis: Array<string>,
};
export type ToolbarConfig = {
  options: Array<ToolbarOption>,
  inline?: Object,
  blockType?: Object,
  textAlign?: Object,
  fontSize: FontSizeConfig,
  fontFamily: FontFamilyConfig,
  list: ListConfig,
  link: LinkConfig,
  embedded: EmbeddedConfig,
  image: ImageConfig,
  remove: RemoveConfig,
  history: HistoryConfig,
  colorPicker: ColorPickerConfig,
  emoji: EmojiConfig,
};

export default {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'embedded',
    'emoji',
    'image',
    'remove',
    'history',
  ],
  inline: {},
  textAlign: {},
  blockType: {},
  fontSize: {
    options: [12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    dropdownClassName: undefined,
    title: 'Font Size',
  },
  fontFamily: {
    options: ['Roboto', 'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    dropdownClassName: undefined,
    title: 'Font Family',
  },
  list: {
    className: undefined,
    unordered: { className: undefined, title: 'Unordered' },
    ordered: { className: undefined, title: 'Ordered' },
    indent: { className: undefined, title: 'Indent' },
    outdent: { className: undefined, title: 'Outdent' },
    title: 'List',
  },
  link: {
    className: undefined,
    modalClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    link: { className: undefined, title: 'Link' },
    unlink: { className: undefined, title: 'Unlink' },
  },
  embedded: {
    className: undefined,
    modalClassName: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
    title: 'Embedded',
  },
  image: {
    className: undefined,
    modalClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
    title: 'Image',
  },
  remove: {
    className: undefined,
    title: 'Remove',
  },
  history: {
    className: undefined,
    undo: {
      className: undefined,
      title: 'Undo',
    },
    redo: {
      className: undefined,
      title: 'Redo',
    },
    title: 'History',
  },
  colorPicker: {
    className: undefined,
    modalClassName: undefined,
    colors: [
      'rgb(97,189,109)',
      'rgb(26,188,156)',
      'rgb(84,172,210)',
      'rgb(44,130,201)',
      'rgb(147,101,184)',
      'rgb(71,85,119)',
      'rgb(204,204,204)',
      'rgb(65,168,95)',
      'rgb(0,168,133)',
      'rgb(61,142,185)',
      'rgb(41,105,176)',
      'rgb(85,57,130)',
      'rgb(40,50,78)',
      'rgb(0,0,0)',
      'rgb(247,218,100)',
      'rgb(251,160,38)',
      'rgb(235,107,86)',
      'rgb(226,80,65)',
      'rgb(163,143,132)',
      'rgb(239,239,239)',
      'rgb(255,255,255)',
      'rgb(250,197,28)',
      'rgb(243,121,52)',
      'rgb(209,72,65)',
      'rgb(184,49,47)',
      'rgb(124,112,107)',
      'rgb(209,213,216)',
    ],
    title: 'Color Picker',
  },
  emoji: {
    className: undefined,
    modalClassName: undefined,
    emojis: [
      '😀',
      '😁',
      '😂',
      '😃',
      '😉',
      '😋',
      '😎',
      '😍',
      '😗',
      '🤗',
      '🤔',
      '😣',
      '😫',
      '😴',
      '😌',
      '🤓',
      '😛',
      '😜',
      '😠',
      '😇',
      '😷',
      '😈',
      '👻',
      '😺',
      '😸',
      '😹',
      '😻',
      '😼',
      '😽',
      '🙀',
      '🙈',
      '🙉',
      '🙊',
      '👼',
      '👮',
      '🕵',
      '💂',
      '👳',
      '🎅',
      '👸',
      '👰',
      '👲',
      '🙍',
      '🙇',
      '🚶',
      '🏃',
      '💃',
      '⛷',
      '🏂',
      '🏌',
      '🏄',
      '🚣',
      '🏊',
      '⛹',
      '🏋',
      '🚴',
      '👫',
      '💪',
      '👈',
      '👉',
      '👉',
      '👆',
      '🖕',
      '👇',
      '🖖',
      '🤘',
      '🖐',
      '👌',
      '👍',
      '👎',
      '✊',
      '👊',
      '👏',
      '🙌',
      '🙏',
      '🐵',
      '🐶',
      '🐇',
      '🐥',
      '🐸',
      '🐌',
      '🐛',
      '🐜',
      '🐝',
      '🍉',
      '🍄',
      '🍔',
      '🍤',
      '🍨',
      '🍪',
      '🎂',
      '🍰',
      '🍾',
      '🍷',
      '🍸',
      '🍺',
      '🌍',
      '🚑',
      '⏰',
      '🌙',
      '🌝',
      '🌞',
      '⭐',
      '🌟',
      '🌠',
      '🌨',
      '🌩',
      '⛄',
      '🔥',
      '🎄',
      '🎈',
      '🎉',
      '🎊',
      '🎁',
      '🎗',
      '🏀',
      '🏈',
      '🎲',
      '🔇',
      '🔈',
      '📣',
      '🔔',
      '🎵',
      '🎷',
      '💰',
      '🖊',
      '📅',
      '✅',
      '❎',
      '💯',
    ],
    title: 'Emoji',
  },
};
