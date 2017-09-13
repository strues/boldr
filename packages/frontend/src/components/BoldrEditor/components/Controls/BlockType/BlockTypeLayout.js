/* eslint-disable react/no-unused-prop-types */
/* @flow */

import React from 'react';
import type { Node } from 'react';
import cn from 'classnames';
import { Paragraph, Heading1, Heading2, Heading3, QuoteLeft, Embedded } from '@boldr/icons';
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
      icon: <Paragraph fill="#222" />,
    },
    {
      label: 'H1',
      id: 2,
      icon: <Heading1 fill="#222" />,
    },
    {
      label: 'H2',
      id: 3,
      icon: <Heading2 fill="#222" />,
    },
    {
      label: 'H3',
      id: 4,
      icon: <Heading3 fill="#222" />,
    },
    {
      label: 'Blockquote',
      id: 5,
      icon: <QuoteLeft fill="#222" />,
    },
    { label: 'Code', id: 6, icon: <Embedded fill="#222" /> },
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
