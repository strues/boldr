/* @flow */
import React from 'react';

import StyleButton from '../StyleButton/StyleButton';

type Props = {
  controls: Array<string>,
  display?: 'block' | 'inline',
  onClick: Function,
  customBlocks: Object,
  customBlockType: string,
};

function CustomBlockControls(props: Props) {
  const { controls, display, onClick, customBlocks, customBlockType } = props;
  const buttons = [];

  const getClickHandlerForType = type => () => {
    onClick({
      showCustomBlockInput: true,
      customBlockType: type,
      customBlockData: customBlocks[type].getInitialData(),
    });
  };

  Object.keys(customBlocks).forEach(key => {
    if (customBlocks.hasOwnProperty(key) && controls && controls.indexOf(key) > -1) {
      buttons.push(
        <StyleButton
          key={ `${key}-button` }
          active={ key === customBlockType }
          label={ customBlocks[key].getLabel() }
          icon={ typeof customBlocks[key].getIcon === 'function' ? customBlocks[key].getIcon() : null }
          onToggle={ getClickHandlerForType(key) }
          style={ '' }
        />,
      );
    }
  });

  return (
    <div className="be-controls__custom" style={ { display } }>
      { buttons }
    </div>
  );
}

export default CustomBlockControls;
