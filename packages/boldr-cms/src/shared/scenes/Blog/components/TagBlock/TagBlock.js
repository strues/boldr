import React from 'react';
import classnames from 'classnames';
import { StyleClasses } from '../../../../theme/theme';
import Tag from '../Tag';

const BASE_ELEMENT = StyleClasses.TAG_BLOCK;

const TagBlock = (props) => {
  if (!props.tags) {
    return null;
  }

  const classes = classnames(
    BASE_ELEMENT,
    props.className,
  );
  return (
    <div className={ classes }>
      {
        props.tags.map(tag => <Tag key={ tag.id } tag={ tag } />)
      }
    </div>
  );
};

TagBlock.propTypes = {
  className: React.PropTypes.string,
  tags: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.name,
  })),
};

export default TagBlock;
