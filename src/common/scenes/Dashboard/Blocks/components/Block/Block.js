/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import type { Block as BlockType } from 'types/models';

type Props = {
  block: BlockType
}
const Block = (props: Props) => {
  const { block } = props;
  return (
    <div>{ /* $FlowIssue */}
    <Link to={ `/dashboard/blocks/build/${block.id}` }>{ block.name } { ' ' } { block.label }</Link>
    </div>
  );
};
export default Block;
