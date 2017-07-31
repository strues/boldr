/* @flow */

import React, { Component } from 'react';
import classNames from 'classnames';

import Option from '../../Option';
import { Dropdown, DropdownOption } from '../../Dropdown';

export type Props = {
  expanded: ?boolean,
  onExpandEvent: ?Function,
  doExpand: ?Function,
  doCollapse: ?Function,
  onChange: ?Function,
  config: ?Object,
  currentState: ?Object,
};

class BlockTypeLayout extends Component {
  props: Props;

  blocksTypes: Array<Object> = [
    {
      label: 'Normal',
      id: 1,
      displayName: 'Normal',
    },
    {
      label: 'H1',
      id: 2,
      displayName: 'H1',
    },
    {
      label: 'H2',
      id: 3,
      displayName: 'H2',
    },
    {
      label: 'H3',
      id: 4,
      displayName: 'H3',
    },
    {
      label: 'H4',
      id: 5,
      displayName: 'H4',
    },
    {
      label: 'H5',
      id: 6,
      displayName: 'H5',
    },
    {
      label: 'H6',
      id: 7,
      displayName: 'H6',
    },
    {
      label: 'Blockquote',
      id: 8,
      displayName: 'Blockquote',
    },
  ];

  renderFlat(blocks: Array<Object>): void {
    const { config: { className }, onChange, currentState: { blockType } } = this.props;
    return (
      <div className={classNames('boldrui-editor__inline-wrapper', className)}>
        {blocks.map(block =>
          <Option
            key={block.id}
            value={block.label}
            active={blockType === block.label}
            onClick={onChange}
          >
            {block.displayName}
          </Option>,
        )}
      </div>
    );
  }

  renderInDropdown(blocks: Array<Object>): void {
    const {
      config: { className, dropdownClassName, title },
      currentState: { blockType },
      expanded,
      doExpand,
      onExpandEvent,
      doCollapse,
      onChange,
    } = this.props;
    const currentBlockData = this.blocksTypes.filter(blk => blk.label === blockType);
    const currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
    return (
      <div className="boldrui-editor__block-wrapper" aria-label="boldrui-editor__block-control">
        <Dropdown
          className={classNames('boldrui-editor__block-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
          title={title}
        >
          <span>
            {currentLabel}
          </span>
          {blocks.map(block =>
            <DropdownOption active={blockType === block.label} value={block.label} key={block.id}>
              {block.displayName}
            </DropdownOption>,
          )}
        </Dropdown>
      </div>
    );
  }

  render(): void {
    const { config } = this.props;
    const { inDropdown } = config;
    const blocks = this.blocksTypes.filter(({ label }) => config.options.includes(label));
    return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
  }
}

export default BlockTypeLayout;
