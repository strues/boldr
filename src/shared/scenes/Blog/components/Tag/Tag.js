/* @flow */
import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
// import Avatar from 'boldr-ui/lib/components/Avatar';
import { FontIcon, StyleClasses } from 'boldr-ui';

import { selectTag } from '../../state/tags/actions';

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
    <div className={classes}>
      <Link to={`/blog/tags/${tag.name}`}>
        <Chip onTouchTap={transitionTag}>
          <Avatar icon={<FontIcon>local_offer</FontIcon>} />{tag.name}
        </Chip>
      </Link>
    </div>
  );
};

export default connect()(Tag);
