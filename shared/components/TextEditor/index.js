import { convertFromRaw, convertToRaw, Entity } from 'draft-js';

import TextEditor from './TextEditor';
import Renderer from './Renderer';
import { ImgBlockPlugin, VidBlockPlugin } from './plugins';

const defaultBlocks = {
  IMG: ImgBlockPlugin,
  VIDEO: VidBlockPlugin,
};

export default TextEditor;

export {
  TextEditor,
  Renderer,
  defaultBlocks,
  convertFromRaw,
  convertToRaw,
  Entity,
};
