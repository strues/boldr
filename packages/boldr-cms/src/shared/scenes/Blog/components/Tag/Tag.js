/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import Avatar from 'material-ui/Avatar';
import TagIcon from 'material-ui/svg-icons/maps/local-offer';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import { selectTag } from '../../../../state/modules/blog/tags/actions';
import type { Tag as TagType } from '../../../../types/models';

type Props = {
  tag: TagType,
  dispatch: Function,
};

const Tag = (props: Props) => {
  const { tag } = props;
  function transitionTag() {
    props.dispatch(selectTag(tag));
  }
  return (
    <div className="boldr-tag">
    { /* $FlowIssue */ }
  <Link to={ `/blog/tags/${tag.name}` }>
    <Chip onClick={ transitionTag }>
        <Avatar icon={ <TagIcon /> } />
          { tag.name }
      </Chip>
   </Link>
 </div>
  );
};

export default connect()(Tag);
