/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Chip from 'react-md/lib/Chips';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { StyleClasses } from 'boldr-ui';
import { selectTag } from '../../../../state/modules/blog/tags/actions';

type Props = {
  className: ?string,
  tag: Tag,
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
        <Chip onClick={ transitionTag } label={ tag.name } avatar={ <Avatar icon={ <FontIcon>local_offer</FontIcon> } /> } />
      </Link>
    </div>
  );
};

export default connect()(Tag);
