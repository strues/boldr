import getEmbedRender from './EmbedRender';
import getImageRender from './ImageRender';

const getBlockRenderFunc = (config, customBlockRenderer) => block => {
  if (typeof customBlockRenderer === 'function') {
    const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
    if (renderedComponent) {
      return renderedComponent;
    }
  }
  if (block.getType() === 'atomic') {
    const contentState = config.getEditorState().getCurrentContent();
    const entity = contentState.getEntity(block.getEntityAt(0));
    if (entity && entity.type === 'IMAGE') {
      return {
        component: getImageRender(config),
        editable: false,
      };
    } else if (entity && entity.type === 'EMBEDDED_LINK') {
      return {
        component: getEmbedRender,
        editable: false,
      };
    }
  }
  return undefined;
};

export default getBlockRenderFunc;
