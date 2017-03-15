/* @flow */
import React from 'react';
import Link from 'react-router/lib/Link';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Chip from 'react-md/lib/Chips';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { StyleClasses } from '../../../../theme/theme';
import { selectTag } from '../../../../state/modules/blog/tags/actions';
import type { Tag as TagType } from '../../../../types/models';

type Props = {
  className: ?string,
  tag: TagType,
  dispatch: Function,
};
const BASE_ELEMENT = StyleClasses.TAG;

const Tag = (props: Props) => {
  const { tag, className } = props;
  const classes = classnames(BASE_ELEMENT, className);
  function transitionTag() {
    props.dispatch(selectTag(tag));
  }
  return (
    <div className={ classes }>
      <Link to={ `/blog/tags/${tag.name}` }>
        <Chip
          onClick={ transitionTag }
          label={ tag.name }
          avatar={ <Avatar icon={ <FontIcon>local_offer</FontIcon> } /> }
        />
      </Link>
    </div>
  );
};

export default connect()(Tag);
