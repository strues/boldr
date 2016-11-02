import { convertFromRaw, convertToRaw, Entity } from 'draft-js';

import BoldrEditor from './BoldrEditor';
import Renderer from './Renderer';
import { ImgBlockPlugin, VidBlockPlugin } from './plugins';

const defaultBlocks = {
  IMG: ImgBlockPlugin,
  VIDEO: VidBlockPlugin,
};

export default BoldrEditor;

export {
  BoldrEditor,
  Renderer,
  defaultBlocks,
  convertFromRaw,
  convertToRaw,
  Entity
};
