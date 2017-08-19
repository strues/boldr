/* eslint-disable react/no-unused-prop-types */
/* @flow */

import * as React from 'react';
import classNames from 'classnames';
import { Paragraph, Heading1, Heading2, Heading3, QuoteLeft, Embedded } from '@boldr/icons';
import Option from '../../Option';

export type Props = {
  onChange: ?Function,
  config: Object,
  currentState: Object,
  expanded: boolean,
  onExpandEvent: Function,
  doExpand: Function,
  doCollapse: Function,
};

class BlockTypeLayout extends React.Component<Props, *> {
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
    { label: 'Code', id: 6, icon: <Embedded color="#222" /> },
  ];

  renderButtons(blocks: Array<React.Node>): ReactElement {
    const { config: { className }, onChange, currentState: { blockType } } = this.props;
    return (
      <div className={classNames('boldr-editor-block__wrapper', className)}>
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
    return this.renderButtons(this.blockTypes);
  }
}

export default BlockTypeLayout;
