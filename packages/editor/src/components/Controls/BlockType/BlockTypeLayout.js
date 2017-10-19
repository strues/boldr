/* eslint-disable react/no-unused-prop-types */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { Paragraph, H1, H2, H3, QuoteLeft, Code } from '../../Icons';
import Option from '../../Option';
import type { ToolbarBlockTypes } from './BlockType';

type CurrentBlock = {
  blockType: string,
};
export type Props = {
  onChange?: Function,
  currentState: CurrentBlock,
  expanded: boolean,
  onExpandEvent: Function,
  doExpand: Function,
  doCollapse: Function,
};

class BlockTypeLayout extends React.PureComponent<Props, *> {
  props: Props;

  blockTypes: ToolbarBlockTypes = [
    {
      label: 'Normal',
      id: 1,
      icon: <Paragraph size={20} fill="#222" />,
    },
    {
      label: 'H1',
      id: 2,
      icon: <H1 size={20} fill="#222" />,
    },
    {
      label: 'H2',
      id: 3,
      icon: <H2 size={20} fill="#222" />,
    },
    {
      label: 'H3',
      id: 4,
      icon: <H3 size={20} fill="#222" />,
    },
    {
      label: 'Blockquote',
      id: 5,
      icon: <QuoteLeft size={20} fill="#222" />,
    },
    { label: 'Code', id: 6, icon: <Code size={20} fill="#222" /> },
  ];

  renderButtons(blocks: ToolbarBlockTypes): Node {
    const { onChange, currentState: { blockType } } = this.props;
    return (
      <div className={cn('be-ctrl__group')}>
        {blocks.map(block => (
          <Option
            key={block.id}
            value={block.label}
            active={blockType === block.label}
            onClick={onChange}>
            {block.icon}
          </Option>
        ))}
      </div>
    );
  }

  render(): Node {
    return this.renderButtons(this.blockTypes);
  }
}

export default BlockTypeLayout;
