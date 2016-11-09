import { Entity } from 'draft-js';
import React from 'react';
import Photo from '../../icons/Photo';

export default {
  getBlockRenderer() {
    return {
      component: props => {
        const entity = Entity.get(props.block.getEntityAt(0)); // eslint-disable-line
        const { src, alt } = entity.getData();
        return <img src={ src } alt={ alt } />;
      },
      editable: false,
    };
  },
  getInitialData() {
    return {
      src: '',
      alt: '',
    };
  },
  getLabel() {
    return 'Image';
  },
  getIcon() {
    return <Photo />;
  },
  renderHTML(data) {
    return `<img src="${data.src}" alt="${data.alt}" />`;
  },
  renderInputForm(data, onDataChange, onKeyDown, onSubmit) {
    const updateSrc = e => {
      onDataChange({
        src: e.target.value,
        alt: data.alt,
      });
    };

    const updateAlt = e => {
      onDataChange({
        src: data.src,
        alt: e.target.value,
      });
    };

    return (
      <div>
        <input
          onChange={ updateSrc }
          type="text"
          value={ data.src }
          onKeyDown={ onKeyDown }
          placeholder="URL"
          ref={ c => { this.refs.customBlockInput = c; } }
        />
        <input
          onChange={ updateAlt }
          type="text"
          value={ data.alt }
          onKeyDown={ onKeyDown }
          placeholder="Alt text"
        />
        <button onMouseDown={ onSubmit }>
          Confirm
        </button>
      </div>
    );
  },
};
