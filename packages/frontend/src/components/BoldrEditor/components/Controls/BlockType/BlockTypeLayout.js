/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';
import { Paragraph, Heading1, Heading2, Heading3, QuoteLeft } from '@boldr/icons';
import Option from '../../Option';

export type Props = {
  onChange: ?Function,
  config: Object,
  currentState: Object,
};

class BlockTypeLayout extends Component {
  props: Props;

  blockTypes: Array<Object> = [
    {
      label: 'Normal',
      id: 1,
      icon: <Paragraph color="#222" />,
    },
    {
      label: 'H1',
      id: 2,
      icon: <Heading1 color="#222" />,
    },
    {
      label: 'H2',
      id: 3,
      icon: <Heading2 color="#222" />,
    },
    {
      label: 'H3',
      id: 4,
      icon: <Heading3 color="#222" />,
    },
    {
      label: 'Blockquote',
      id: 5,
      icon: <QuoteLeft color="#222" />,
    },
  ];

  renderButtons(blocks: Array<Object>): ReactElement {
    const { config: { className }, onChange, currentState: { blockType } } = this.props;
    return (
      <div className={classNames('boldredit-block__wrapper', className)}>
        {blocks.map(block =>
          <Option
            key={block.id}
            value={block.label}
            active={blockType === block.label}
            onClick={onChange}
          >
            {block.icon}
          </Option>,
        )}
      </div>
    );
  }

  render(): void {
    const { config } = this.props;
    const blocks = this.blockTypes.filter(({ label }) => config.options.includes(label));
    return this.renderButtons(blocks);
  }
}

export default BlockTypeLayout;
