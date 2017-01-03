import { convertFromRaw, Entity } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default class Renderer {
  constructor(customBlocks) {
    this.customBlocks = customBlocks;

    this.convertRawToHTML = this.convertRawToHTML.bind(this);
  }

  convertRawToHTML(rawContent) {
    const options = {
      blockRenderers: {
        atomic: block => {
          const data = Entity.get(block.getEntityAt(0)).getData();
          const type = Entity.get(block.getEntityAt(0)).getType();

          return this.customBlocks[type] ? this.customBlocks[type].renderHTML(data) : null;
        },
      },
    };

    return stateToHTML(convertFromRaw(rawContent), options);
  }
}
